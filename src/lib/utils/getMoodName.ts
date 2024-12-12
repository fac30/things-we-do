export default function getMoodName(dopamine: number, adrenaline: number, serotonin: number): string {
  let moodName = "";

  if (dopamine <= 5) {
    if (adrenaline <= 5) {
      if (serotonin <= 5) {
        moodName = "guilt";
      } else if (serotonin >= 6) {
        moodName = "content";
      }
    } else if (adrenaline >= 6) {
      if (serotonin <= 5) {
        moodName = "distress";
      } else if (serotonin >= 6) {
        moodName = "relief";
      }
    }
  } else if (dopamine >= 6) {
    if (adrenaline <= 5) {
      if (serotonin <= 5) {
        moodName = "freeze";
      } else if (serotonin >= 6) {
        moodName = "joy";
      }
    } else if (adrenaline >= 6) {
      if (serotonin <= 5) {
        moodName = "fight/flight";
      } else if (serotonin >= 6) {
        moodName = "interest";
      }
    }
  }

  return moodName;
}