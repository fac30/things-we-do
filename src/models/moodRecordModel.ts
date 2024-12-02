import rxdbInit from "@/lib/db/rxdbInit";

export async function addMoodRecord(moodObj) {
  const { dopamine, serotonin, adrenaline } = moodObj;
  console.log(dopamine);
  const db = await rxdbInit();

  const newMood = await db.mood_records.insert({
    id: "10",
    neurotransmitters: {
      dopamine: dopamine,
      seratonin: serotonin,
      adrenaline: adrenaline,
    },
    moodName: "",
    timestamp: new Date().toISOString(),
  });

  console.log("Database seeded with data: ", newMood);
  //   console.log("hello, mood changed", db);
}
