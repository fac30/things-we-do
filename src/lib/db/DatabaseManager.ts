import { addRxPlugin, RxDocumentData } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { createRxDatabase, RxDatabase } from "rxdb";
import { v4 as uuidv4 } from "uuid";

import toolkitItemSchema from "./schemas/toolkitItemSchema.json";
import moodRecordSchema from "./schemas/moodRecordSchema.json";
import categoriesSchema from "./schemas/categoriesSchema.json";
import needsCategoriesSchema from "./schemas/categoriesSchema.json";
import needsSchema from "./schemas/categoriesSchema.json";
import nextActionsSchema from "./schemas/categoriesSchema.json";

import { categories, toolkit } from "./seed/toolkit";
import { needsCategories, needs, nextActions } from "./seed/needs";

import { RxDBUpdatePlugin } from "rxdb/plugins/update";
addRxPlugin(RxDBUpdatePlugin);

addRxPlugin(RxDBDevModePlugin);

let dbInstance: RxDatabase | null = null;

class DatabaseManager {
  private static instance: DatabaseManager;

  private constructor() {}

  static getInstance() {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  private async createDatabase() {
    if (dbInstance) return dbInstance;

    dbInstance = await createRxDatabase({
      name: "database",
      storage: getRxStorageDexie(),
      ignoreDuplicate: true,
    });

    const requiredCollections = [
      "categories",
      "mood_records",
      "toolkit_items",
      "needs_categories",
      "needs",
      "next_actions",
    ];
    const existingCollections = Object.keys(dbInstance.collections);

    for (const collection of requiredCollections) {
      if (!existingCollections.includes(collection)) {
        console.log(`Adding missing collection: ${collection}`);
        await dbInstance.addCollections({
          [collection]: this.getSchemaForCollection(collection),
        });
      }
    }

    console.log("Database initialised.");
    await this.seedDatabase();
    return dbInstance;
  }

  async accessDatabase() {
    if (!dbInstance) {
      dbInstance = await this.createDatabase();
    }
    if (!dbInstance) {
      throw new Error("Failed to initialise the database.");
    }
    return dbInstance;
  }

  private async seedDatabase() {
    try {
      await this.seed("categories", categories);
      await this.seed("toolkit_items", toolkit);
      await this.seed("needs_categories", needsCategories);
      await this.seed("needs", needs);
      await this.seed("next_actions", nextActions);
    } catch (error) {
      console.error("Error during database seeding:", error);
    }
  }

  private async seed<T>(collectionName: string, data: T[]) {
    if (!dbInstance) throw new Error("Database not initialised.");
    const collection = dbInstance.collections[collectionName];
    if (!collection)
      throw new Error(`${collectionName} collection is missing.`);

    const existingDocs = await collection.find().exec();
    if (existingDocs.length === 0) {
      console.log(`Seeding ${collectionName}...`);
      await collection.bulkInsert(data);
    }
  }

  private getSchemaForCollection(collectionName: string) {
    switch (collectionName) {
      case "categories":
        return { schema: categoriesSchema };
      case "mood_records":
        return { schema: moodRecordSchema };
      case "toolkit_items":
        return { schema: toolkitItemSchema };
      case "needs_categories":
        return { schema: needsCategoriesSchema };
      case "needs":
        return { schema: needsSchema };
      case "next_actions":
        return { schema: nextActionsSchema };
      default:
        throw new Error(`Unknown collection: ${collectionName}`);
    }
  }

  async getFromDb<T>(collection: string): Promise<RxDocumentData<T>[]> {
    const db = await this.accessDatabase();
    const collectionExists = db.collections[collection];
    if (!collectionExists)
      throw new Error(`Collection '${collection}' not found`);
    const data = await collectionExists.find().exec();
    console.log(`Getting data from ${collection}:`, data);
    return data.map((doc) => doc.toJSON() as RxDocumentData<T>);
  }

  async addToDb(collectionName: string, document: object) {
    const db = await this.accessDatabase();
    const collection = db.collections[collectionName];
    if (!collection)
      throw new Error(`Collection '${collectionName}' not found`);
    const data = await collection.insert({
      ...document,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    });
    console.log(`Adding data to ${collectionName}:`, data);
    return data;
  }

  async addCategories(name: string) {
    return this.addToDb("categories", {
      name,
      timestamp: new Date().toISOString(),
    });
  }

  async deleteFromDb(collectionName: string, docId: string): Promise<void> {
    try {
      const db = await this.accessDatabase();
      const collection = db.collections[collectionName];
      if (!collection) {
        throw new Error(`Collection '${collectionName}' does not exist`);
      }
      const document = await collection
        .findOne({ selector: { id: docId } })
        .exec();
      if (!document) {
        throw new Error(`Document with ID '${docId}' not found`);
      }
      await document.remove();
    } catch (error) {
      console.error(`Error in deleteFromDb:`, error);
      throw error;
    }
  }

  async updateDocument(
    collectionName: string,
    docId: string,
    field: string,
    update: string
  ) {
    try {
      const db = await this.accessDatabase();
      const collection = db.collections[collectionName];

      if (!collection) {
        throw new Error(`Collection '${collectionName}' does not exist`);
      }

      const document = await collection
        .findOne({ selector: { id: docId } })
        .exec();

      if (!document) {
        throw new Error(
          `Document with ID '${docId}' not found in collection '${collectionName}'`
        );
      }

      const updatedDocument = await document.patch({
        [field]: update,
      });

      console.log(`Updated document in ${collectionName}:`, updatedDocument);
      return updatedDocument;
    } catch (error) {
      console.error(`Error in updateDocument:`, error);
      throw error;
    }
  }
}

export default DatabaseManager.getInstance();
