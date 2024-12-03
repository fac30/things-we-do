"use client";

import { getFromDb } from "@/models/getFromDb";
import { useEffect, useState } from "react";
import { getSingleDocument } from "rxdb";

export default function InsightsDisplay() {
  const [insights, setInsights] = useState();

  const getInsights = async () => {
    const myInsights = await getFromDb();
    setInsights(myInsights);
  };

  useEffect(() => {
    getInsights();
  });

  return (
    <>
      <h1>he</h1>
      <h1>llo</h1>
    </>
  );
}
