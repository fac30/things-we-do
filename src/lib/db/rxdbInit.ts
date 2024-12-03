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

  console.log("Checking if database needs seeding...");
      
  const toolkitSeed = await db.toolkit_items.bulkInsert([
  {
    id: crypto.randomUUID(),
    name: "Listen to my favourite music",
    category: ["Replace", "Barrier"],
    checked: false,
    infoUrl: "https://google.com/music",
    imageUrl: "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg",
    timestamp: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    name: "Watch TV",
    category: ["Distract"],
    checked: false,
    infoUrl: "https://google.com/tv",
    imageUrl: "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg",
    timestamp: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    name: "Call a friend",
    category: ["Distract", "Change status"],
    checked: false,
    infoUrl: "https://example.com/call",
    imageUrl: "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg",
    timestamp: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    name: "See a friend",
    category: ["Distract", "Change status"],
    checked: false,
    infoUrl: "https://example.com/call",
    imageUrl: "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg",
    timestamp: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    name: "Write a book",
    category: ["Distract", "Change status"],
    checked: false,
    infoUrl: "https://example.com/call",
    imageUrl: "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg",
    timestamp: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    name: "Sing a song",
    category: ["Distract", "Change status"],
    checked: false,
    infoUrl: "https://example.com/call",
    imageUrl: "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg",
    timestamp: new Date().toISOString()
    }
  ]);
    console.log("Seeding Finished:", toolkitSeed);

return dbInstance;
}

