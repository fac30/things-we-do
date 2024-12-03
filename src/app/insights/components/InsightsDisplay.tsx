"use client";

import { getFromDb } from "@/models/getFromDb";
import { useEffect, useState } from "react";

export default function InsightsDisplay() {
  const [insights, setInsights] = useState([]);

  const getInsights = async () => {
    const myInsights = await getFromDb();
    console.log(myInsights);
    setInsights(myInsights);
  };

  useEffect(() => {
    getInsights();
  }, []);

  return (
    <>
      {insights.length > 0 ? (
        insights.map((insight, index) => (
          <div key={index} className="mb-5">
            <h1>dopamine: {insight._data.neurotransmitters.dopamine}</h1>
            <h1>serotonin: {insight._data.neurotransmitters.serotonin}</h1>
            <h1>adrenaline: {insight._data.neurotransmitters.adrenaline}</h1>
          </div>
        ))
      ) : (
        <h1>No insights available</h1> // Fallback message when no insights are available
      )}
    </>
  );
}
