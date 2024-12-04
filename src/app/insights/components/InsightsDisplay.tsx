"use client";

import DatabaseManager from "@/lib/db/DatabaseManager";
import { useEffect, useState } from "react";
import LineGraph from "./LineGraph";

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
      <LineGraph dataArray={insights} />
      {insights ? (
        insights.map((insight, index) => (
          <div key={index} className="mb-5">
            <p>dopamine: {insight.neurotransmitters.dopamine}</p>
            <p>serotonin: {insight.neurotransmitters.serotonin}</p>
            <p>adrenaline: {insight.neurotransmitters.adrenaline}</p>
          </div>
        ))
      ) : (
        <p>No insights available</p>
      )}
    </>
  );
}
