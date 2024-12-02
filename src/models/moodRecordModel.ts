import rxdbInit from "@/lib/db/rxdbInit";

export function addMoodRecord() {
  const db = rxdbInit();
  console.log("hello, mood changed", db);
}
