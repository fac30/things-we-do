"use client";

import DatabaseManager from "@/lib/db/DatabaseManager";
import { useEffect, useState } from "react";
import LineGraph from "./LineGraph";
import retrieveDataObject from "@/lib/utils/retrieveDataObject";

export interface Insight {
  neurotransmitters: {
    dopamine: number;
    serotonin: number;
    adrenaline: number;
  };
  moodName: string;
  timestamp: string;
  id: string;
  createdAt: string;
}

export default function InsightsDisplay() {
  const [insights, setInsights] = useState<Insight[] | null>(null);

  const getInsights = async () => {
    const myInsights = await DatabaseManager.getFromDb("mood_records");

    if (!myInsights) {
      console.log("No insights found.");
      setInsights([]);
      return;
    }
    const goodInsights = retrieveDataObject(myInsights);

    setInsights(goodInsights);
  };

  useEffect(() => {
    getInsights();
  }, []);

  return (
    <>
      <div className="bg-[#262538] w-11/12 m-auto">
        <div className="w-10/12 m-auto py-5">
          <h2 className="text-xl">Decision Maker</h2>
          <p>How did the things I wanted to do feel?</p>
        </div>
        {insights ? (
          <LineGraph dataArray={insights} />
        ) : (
          <div>Loading insights...</div>
        )}
      </div>
    </>
  );
}
