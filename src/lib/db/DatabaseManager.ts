import { addRxPlugin } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { createRxDatabase, RxDatabase } from "rxdb";
import toolkitItemSchema from "./schemas/toolkitItemSchema.json";
import moodRecordSchema from "./schemas/moodRecordSchema.json";
import categoriesSchema from "./schemas/categoriesSchema.json";
import { v4 as uuidv4 } from "uuid";

addRxPlugin(RxDBDevModePlugin);

const toolkitSeedData = [
  {
    id: uuidv4(),
    name: "Listen to my favourite music",
    categories: ["Replace", "Barrier"],
    checked: false,
    infoUrl: "https://google.com/music",
    imageUrl:
      "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg",
    timestamp: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Watch TV",
    categories: ["Distract"],
    checked: false,
    infoUrl: "https://google.com/tv",
    imageUrl:
      "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg",
    timestamp: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Call a friend",
    categories: ["Distract", "Change status"],
    checked: false,
    infoUrl: "https://example.com/call",
    imageUrl:
      "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg",
    timestamp: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "See a friend",
    categories: ["Distract", "Change status"],
    checked: false,
    infoUrl: "https://example.com/call",
    imageUrl:
      "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg",
    timestamp: new Date().toISOString(),
  },
];

class DatabaseManager {
  dbInstance: RxDatabase | null = null;

  async initialiseDatabase() {
    if (!this.dbInstance) {
      this.dbInstance = await createRxDatabase({
        name: "database",
        //ignoreDuplicate: true,
        storage: getRxStorageDexie(),
      });

      await this.dbInstance.addCollections({
        categories: { schema: categoriesSchema },
        mood_records: { schema: moodRecordSchema },
        toolkit_items: { schema: toolkitItemSchema },
      });

      console.log("Database initialised");
      await this.seedToolkitItems(); // Automatically seed data
    }
    return this.dbInstance;
  }

  async seedToolkitItems() {
    try {
      const db = await this.initialiseDatabase();
      if (!db) {
        console.error("Database initialisation failed");
        return;
      }
      const toolkitCollection = db.toolkit_items;
      if (!toolkitCollection) {
        console.error("Toolkit items collection does not exist");
        return;
      }
      console.log("Checking if toolkit_items collection is already seeded...");
      const existingDocuments = await toolkitCollection.find().exec();
      if (existingDocuments.length > 0) {
        console.log(
          "Toolkit items collection is already seeded. Skipping seeding process."
        );
        return;
      }
      console.log("Seeding toolkit_items collection with initial data...");
      const insertedDocs = await toolkitCollection.bulkInsert(toolkitSeedData);
      console.log("Seed data successfully inserted:", insertedDocs);
    } catch (error) {
      console.error("Error seeding the database:", error);
    }
  }

  async getFromDb(collection: string) {
    const db = await this.initialiseDatabase();

    if (db) {
      const collectionExists = db[collection];
      if (!collectionExists) {
        console.error(`Collection '${collection}' does not exist`);
        return null;
      }

      const myCollection = await collectionExists.find().exec();

      return myCollection;
    } else {
      console.error("Failed to get data from database");
      return null;
    }
  }

  async addToDb(collectionName: string, document: object) {
    try {
      const db = await this.initialiseDatabase();
      if (!db) {
        console.error("Database initialisation failed");
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

  async addCategories(name: string) {
    try {
      const doc = {
        name: name,
        timestamp: new Date().toISOString(),
      };

      return await this.addToDb("categories", doc);
    } catch (error) {
      console.error("Error adding categories to database:", error);
      throw error;
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new DatabaseManager();
