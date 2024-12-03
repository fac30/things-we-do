import { addRxPlugin } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { createRxDatabase, RxDatabase } from "rxdb";
import toolkitItemSchema from "./schemas/toolkitItemSchema.json";
import moodRecordSchema from "./schemas/moodRecordSchema.json";
import categorySchema from "./schemas/categorySchema.json";
import { v4 as uuidv4 } from "uuid";

addRxPlugin(RxDBDevModePlugin);

class DatabaseManager {
  dbInstance: RxDatabase | null = null;

  async initializeDatabase() {
    if (!this.dbInstance) {
      this.dbInstance = await createRxDatabase({
        name: "database",
        storage: getRxStorageDexie(),
      });

      await this.dbInstance.addCollections({
        categories: { schema: categorySchema },
        mood_records: { schema: moodRecordSchema },
        toolkit_items: { schema: toolkitItemSchema },
      });

      console.log("Database initialized");
    }
    return this.dbInstance;
  }

  async getFromDb() {
    const db = await this.initializeDatabase();
    if (db) {
      const myCollection = await db.mood_records.find().exec();
      console.log(myCollection);
      return myCollection;
    } else {
      console.log("Database initialization failed");
      return null;
    }
  }

  async addToDb(collectionName: string, document: object) {
    try {
      const db = await this.initializeDatabase();

      if (!db) {
        console.error("Database initialization failed");
        return;
      }

      const collection = db[collectionName];
      if (!collection) {
        console.error(`Collection '${collectionName}' not found`);
        return;
      }

      const documentWithDefaults = {
        ...document,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      };

      const newDocument = await collection.insert(documentWithDefaults);

      console.log(
        `Document inserted into '${collectionName}' collection: `,
        newDocument
      );
      return newDocument;
    } catch (error) {
      console.error("Error adding document to database:", error);
    }
  }
}

export default new DatabaseManager();
