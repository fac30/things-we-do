"use client";

import DatabaseManager from "@/lib/db/databaseManager";
import { useEffect, useState } from "react";

interface Insight {
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
    console.log(myInsights);
    setInsights(myInsights);
  };

  useEffect(() => {
    getInsights();
  }, []);

  return (
    <>
      {insights ? (
        insights.map((insight, index) => (
          <div key={index} className="mb-5">
            <h1>dopamine: {insight.neurotransmitters.dopamine}</h1>
            <h1>serotonin: {insight.neurotransmitters.serotonin}</h1>
            <h1>adrenaline: {insight.neurotransmitters.adrenaline}</h1>
          </div>
        ))
      ) : (
        <h1>No insights available</h1>
      )}
    </>
  );
}
