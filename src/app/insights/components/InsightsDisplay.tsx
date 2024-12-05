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
    const goodInsights = retrieveDataObject(myInsights);
    console.log(goodInsights);
    setInsights(goodInsights);
  };

  useEffect(() => {
    getInsights();
  }, []);

  return (
    <>
      {insights ? (
        <LineGraph dataArray={insights} />
      ) : (
        <div>Loading insights...</div>
      )}
    </>
  );
}
