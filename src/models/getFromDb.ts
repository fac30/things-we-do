import rxdbInit from "@/lib/db/rxdbInit";

export async function getFromDb() {
  const db = await rxdbInit();

  const myCollection = await db.mood_records.find().exec();
  console.log(myCollection[0]._data);
  return myCollection;
}
