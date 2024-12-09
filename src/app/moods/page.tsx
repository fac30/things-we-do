"use client";

import { Header } from "../../ui/shared/Header";
import { Suspense, lazy, useState, useEffect } from "react";

const MoodsDisplay = lazy(() => import("./components/MoodsDisplay"));

export default function MoodsPage() {
  const [key, setKey] = useState(0);

  // This hook forces a re-render by changing the key value on every update
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <div className="flex flex-col gap-4">
      <Header
        title="Decision Maker"
        description="assess your mood before making a decision."
        hasInfoButton={true}
      />
      <Suspense
        key={key}
        fallback={<div>Loading moods using suspense SUSPENSE WITH KEY...</div>}
      >
        <MoodsDisplay />
      </Suspense>
    </div>
  );
}
