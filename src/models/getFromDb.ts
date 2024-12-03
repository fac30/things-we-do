import rxdbInit from "@/lib/db/rxdbInit";

export async function getFromDb() {
  const db = await rxdbInit();

  const myCollection = db.mood_records;
  console.log(myCollection);
}
