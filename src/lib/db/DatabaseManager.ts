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
    infoUrl: "https://open.spotify.com/",
    imageUrl:
      "https://yt3.googleusercontent.com/vuOdWtsiJ02ciel4pqaheZbl3SJx5uP5xu_xJlAilwFRKsvYjZqHGiIGvZxWKVHIEHvVRhQctrc=s900-c-k-c0x00ffffff-no-rj",
    timestamp: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Breathing exercises",
    categories: ["Distract"],
    checked: false,
    infoUrl: "https://www.youtube.com/watch?v=DbDoBzGY3vo",
    imageUrl:
      "https://www.bhf.org.uk/-/media/images/information-support/heart-matters/2023/december/wellbeing/deep-breathing-620x400.png?h=400&w=620&rev=4506ebd34dab4476b56c225b6ff3ad60&hash=B3CFFEEE704E4432D101432CEE8B2766",
    timestamp: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Call a friend",
    categories: ["Distract", "Change status"],
    checked: false,
    infoUrl: "https://www.phonemyfriend.com/",
    imageUrl:
      "https://t4.ftcdn.net/jpg/04/63/63/59/360_F_463635935_IweuYhCqZRtHp3SLguQL8svOVroVXvvZ.jpg",
    timestamp: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Drink water",
    categories: ["Distract", "Change status"],
    checked: false,
    infoUrl: "https://example.com/call",
    imageUrl:
      "https://content.health.harvard.edu/wp-content/uploads/2023/07/b8a1309a-ba53-48c7-bca3-9c36aab2338a.jpg",
    timestamp: new Date().toISOString(),
  },
];

class DatabaseManager {
  dbInstance: RxDatabase | null = null;

  async initialiseDatabase() {
    if (!this.dbInstance) {
      this.dbInstance = await createRxDatabase({
        name: "database",
        ignoreDuplicate: true,
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
        //console.error("Database initialisation failed");
        return;
      }
      const toolkitCollection = db.toolkit_items;
      if (!toolkitCollection) {
        //console.error("Toolkit items collection does not exist");
        return;
      }
      //console.log("Checking if toolkit_items collection is already seeded...");
      const existingDocuments = await toolkitCollection.find().exec();
      if (existingDocuments.length > 0) {
        // console.log(
        //   "Toolkit items collection is already seeded. Skipping seeding process."
        // );
        return;
      }
      //console.log("Seeding toolkit_items collection with initial data...");
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

  
  async deleteFromDb(collectionName: string, docId: string): Promise<void> {
    try {
      const db = await this.initialiseDatabase();
      console.log("Database instance initialized:", db);
      const collection = db[collectionName];
      if (!collection) {
        throw new Error(`Collection '${collectionName}' does not exist`);
      }
      console.log(`Attempting to find document with ID: ${docId}`);

      const document = await collection.findOne({ selector: { id: docId } }).exec();

      console.log("Found document:", document);
      if (!document) {
        throw new Error(`Document with ID '${docId}' not found`);
      }
      await document.remove();
      console.log(`Document with ID '${docId}' successfully removed`);
    } catch (error) {
      console.error(`Error in deleteFromDb:`, error);
      throw error;
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new DatabaseManager();
