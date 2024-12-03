// import { addRxPlugin } from "rxdb";
// import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
// import rxdbInit from "./rxdbInit";

// addRxPlugin(RxDBDevModePlugin);

// export default async function rxdbSeed() {
//   const db = await rxdbInit();

//   const testMood = await db.moods.insert({
//     id: "1",
//     neurotransmitters: {
//       seratonin: 10,
//       dopamine: 10,
//       adrenaline: 10,
//     },
//     moodName: "",
//     timestamp: new Date().toISOString(),
//   });

//   console.log("Database seeded with data: ", testMood);
// }
