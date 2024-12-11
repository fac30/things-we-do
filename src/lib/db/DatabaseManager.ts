/* eslint-disable @typescript-eslint/no-explicit-any */
import { addRxPlugin } from "rxdb";
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

addRxPlugin(RxDBDevModePlugin);

function getMoodName(dopamine: number, adrenaline: number, serotonin: number): string {
  if (dopamine <= 5) {
    if (adrenaline <= 5) {
      if (serotonin <= 5) {
        return "guilt";
      } else if (serotonin >= 6) {
        return "content";
      }
    } else if (adrenaline >= 6) {
      if (serotonin <= 5) {
        return "distress";
      } else if (serotonin >= 6) {
        return "relief";
      }
    }
  } else if (dopamine >= 6) {
    if (adrenaline <= 5) {
      if (serotonin <= 5) {
        return "freeze";
      } else if (serotonin >= 6) {
        return "joy";
      }
    } else if (adrenaline >= 6) {
      if (serotonin <= 5) {
        return "fight/flight";
      } else if (serotonin >= 6) {
        return "interest";
      }
    }
  }
  return "content"; // default fallback
}

const generateMoodRecords = () => {
  const records = [];
  const now = new Date();
  
  for (let i = 0; i < 78; i++) {
    // Random values between 1 and 10
    const dopamine = Math.floor(Math.random() * 10) + 1;
    const serotonin = Math.floor(Math.random() * 10) + 1;
    const adrenaline = Math.floor(Math.random() * 10) + 1;
    
    // Calculate date (i weeks ago)
    const timestamp = new Date(now);
    timestamp.setDate(timestamp.getDate() - (i * 7));
    
    records.push({
      id: uuidv4(),
      neurotransmitters: {
        serotonin,
        dopamine,
        adrenaline
      },
      moodName: getMoodName(dopamine, adrenaline, serotonin),
      timestamp: timestamp.toISOString()
    });
  }
  
  return records;
};

const seedData = {
  categories: [
    { id: uuidv4(), name: "Replace", timestamp: new Date().toISOString() },
    { id: uuidv4(), name: "Barrier", timestamp: new Date().toISOString() },
    { id: uuidv4(), name: "Distract", timestamp: new Date().toISOString() },
    { id: uuidv4(), name: "Change Status", timestamp: new Date().toISOString() },
  ],
  toolkit: [
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
      infoUrl: "https://example.com/call",
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
  ],
  mood_records: generateMoodRecords(),
};

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
    await this.devSeedDatabase();
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
      await this.oldSeedCategories();
      // await this.seed("categories", categories);
      await this.oldSeedToolkitItems();
      // await this.seed("toolkit_items", toolkit);
      // await this.seed("needs_categories", needsCategories);
      // await this.seed("needs", needs);
      // await this.seed("next_actions", nextActions);
    } catch (error) {
      console.error("Error during database seeding:", error);
    }
  }

  private async devSeedDatabase() {
    try {
      await this.seed("mood_records", seedData.mood_records);
    } catch (error) {
      console.error("Error during database seeding:", error);
    }
  }

  private async seed<T>(collectionName: string, data: T[]) {
    if (!dbInstance) throw new Error(
      "Database not initialised."
    );

    const collection = dbInstance.collections[collectionName];

    if (!collection) throw new Error(
      `${collectionName} collection is missing.`
    );

    const existingDocs = await collection.find().exec();
    
    if (existingDocs.length === 0) {
      console.log(`Seeding ${collectionName}...`);
      await collection.bulkInsert(data);
    }
  }

  private async oldSeedCategories() {
    if (!dbInstance) throw new Error("Database not initialized.");
    if (!dbInstance.collections.categories) {
      throw new Error("Categories collection is missing.");
    }
    const existingDocs = await dbInstance.categories.find().exec();
    if (existingDocs.length === 0) {
      console.log("Seeding categories...");
      await dbInstance.categories.bulkInsert(seedData.categories);
    }
  }

  private async oldSeedToolkitItems() {
    if (!dbInstance) throw new Error("Database not initialized.");
    if (!dbInstance.collections.toolkit_items) {
      throw new Error("Toolkit items collection is missing.");
    }
    
    const existingDocs = await dbInstance.toolkit_items.find().exec();
    if (existingDocs.length === 0) {
      console.log(`Seeding Toolkit_Items...`);
      await dbInstance.toolkit_items.bulkInsert(seedData.toolkit);
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

  async getFromDb(collection: string) {
    const db = await this.accessDatabase();
    const collectionExists = db.collections[collection];
    if (!collectionExists)
      throw new Error(`Collection '${collection}' not found`);
    const data = await collectionExists.find().exec();
    console.log(`Getting data from ${collection}:`, data);
    return data;
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
}

export default DatabaseManager.getInstance();
