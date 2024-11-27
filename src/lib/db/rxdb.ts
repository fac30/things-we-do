import { addRxPlugin } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { createRxDatabase } from "rxdb";

addRxPlugin(RxDBDevModePlugin);

const db = await createRxDatabase({
  name: "database",
  storage: getRxStorageDexie()
});

const moodSchema = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100
    },
    neurotransmitters: {
      type: "object",
      seratonin: { type: "number"},
      dopamine: { type: "number" },
      adrenaline: { type: "number" }
    },
    moodName: { type: "string" },
    timestamp: {
      type: "string",
      format: "date-time"
    }
  },
  required: ["id", "neurotransmitters", "moodName", "timestamp"]
}

await db.addCollections({
  moods: {
    schema: moodSchema
  }
});

export const testMood = await db.moods.insert({
  id: "1",
  neurotransmitters: {
    seratonin: 10,
    dopamine: 10,
    adrenaline: 10
  },
  moodName: "",
  timestamp: new Date().toISOString()
});

console.log(testMood);