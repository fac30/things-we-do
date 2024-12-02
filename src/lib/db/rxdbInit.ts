import { addRxPlugin } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { createRxDatabase, RxDatabase } from "rxdb";

addRxPlugin(RxDBDevModePlugin);

let dbInstance: RxDatabase | null = null;

export default async function rxdbInit() {
  if (dbInstance) {
    console.log("Database already initialized");
    return dbInstance;
  }

  const db = await createRxDatabase({
    name: "database",
    storage: getRxStorageDexie(),
  });

  const categorySchema = {
    version: 0,
    primaryKey: "id",
    type: "object",
    properties: {
      id: {
        type: "string",
        maxLength: 100,
      },
      name: { type: "string" },
      timestamp: {
        type: "string",
        format: "date-time",
      },
    },
    required: ["id", "name", "timestamp"],
  };

  const moodSchema = {
    version: 0,
    primaryKey: "id",
    type: "object",
    properties: {
      id: {
        type: "string",
        maxLength: 100,
      },
      neurotransmitters: {
        type: "object",
        properties: {
          seratonin: { type: "number" },
          dopamine: { type: "number" },
          adrenaline: { type: "number" },
        },
      },
      moodName: { type: "string" },
      timestamp: {
        type: "string",
        format: "date-time",
      },
    },
    required: ["id", "neurotransmitters", "moodName", "timestamp"],
  };

  const toolkitSchema = {
    version: 0,
    primaryKey: "id",
    type: "object",
    properties: {
      id: {
        type: "string",
        maxLength: 100,
      },
      name: { type: "string" },
      categories: {
        type: "array",
        items: {
          type: "string",
          ref: "categories",
        },
      },
      checked: { type: "boolean" },
      description: { type: "string" },
      infoURL: { type: "string" },
      imageUrl: { type: "string" },
      timestamp: {
        type: "string",
        format: "date-time",
      },
    },
    required: [
      "id",
      "name",
      "categories",
      "checked",
      "link",
      "imageUrl",
      "timestamp",
    ],
  };

  await db.addCollections({
    categories: { schema: categorySchema },
    moods: { schema: moodSchema },
    toolkit: { schema: toolkitSchema },
  });

  dbInstance = db;

  console.log("Database initialized");
  return db;
}
