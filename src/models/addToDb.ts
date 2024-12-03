// import { v4 as uuidv4 } from "uuid";
// import rxdbInit from "@/lib/db/rxdbInit";

// export async function addToDb(collectionName: string, document: object) {
//   try {
//     const db = await rxdbInit();

//     if (!db) {
//       console.error("Database initialization failed");
//       return;
//     }

//     const collection = db[collectionName];
//     if (!collection) {
//       console.error(`Collection '${collectionName}' not found`);
//       return;
//     }

//     const documentWithDefaults = {
//       ...document,
//       id: uuidv4(),
//       createdAt: new Date().toISOString(),
//     };

//     const newDocument = await collection.insert(documentWithDefaults);

//     console.log(
//       `Document inserted into '${collectionName}' collection: `,
//       newDocument
//     );
//     return newDocument;
//   } catch (error) {
//     console.error("Error adding document to database:", error);
//   }
// }
