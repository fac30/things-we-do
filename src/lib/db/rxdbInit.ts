import { addRxPlugin } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { createRxDatabase, RxDatabase } from "rxdb";
import toolkitItemSchema from "./schemas/toolkitItemSchema.json";
import moodRecordSchema from "./schemas/moodRecordSchema.json";
import categorySchema from "./schemas/categorySchema.json";

addRxPlugin(RxDBDevModePlugin);

let dbInstance: RxDatabase | null = null;

export default async function rxdbInit() {
  if (dbInstance) {
    console.log("Still Tracking Database");
    return dbInstance;
  }

  const db = await createRxDatabase({
    name: "database",
    storage: getRxStorageDexie(),
  });

  await db.addCollections({
    categories: { schema: categorySchema },
    mood_records: { schema: moodRecordSchema },
    toolkit_items: { schema: toolkitItemSchema },
  });

  dbInstance = db;

  console.log(
    "*************************************************** Database initialized ***************************************************"
  );
  return dbInstance;
}


