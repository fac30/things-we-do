import getMoodName from "@/lib/utils/getMoodName";
import { v4 as uuidv4 } from "uuid";

export default function generateMoodRecords(mode: string) {
  const records = [];
  const now = new Date();
  let weeks: number = 0;

  if (mode == "dev") {
    weeks = 78;
  } else {
    weeks = 1;
  }
  
  for (let i = 0; i < weeks; i++) {
    const dopamine = Math.floor(Math.random() * 10) + 1;
    const serotonin = Math.floor(Math.random() * 10) + 1;
    const adrenaline = Math.floor(Math.random() * 10) + 1;
    
    const timestamp = new Date(now);
    timestamp.setDate(timestamp.getDate() - (i * 7));
    
    records.push({
      id: uuidv4(),
      neurotransmitters: {
        serotonin,
        dopamine,
        adrenaline
      },
      moodName: getMoodName(dopamine, adrenaline, serotonin),
      timestamp: timestamp.toISOString()
    });
  }
  
  return records;
};