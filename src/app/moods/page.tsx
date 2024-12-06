"use client";

import { useState } from "react";
import { Header } from "../../ui/shared/Header";
import { Cube } from "./components/Cube";
import { SliderBox } from "./components/SliderBox";
import { NeurochemContext, NeurochemState } from "@/context/NeurochemContext";
import Button from "@/ui/shared/Button";
import DatabaseManager from "../../lib/db/DatabaseManager";
import { useRouter } from "next/navigation";

export default function MoodsPage() {
  const router = useRouter();
  const [neuroState, setNeuroState] = useState<NeurochemState>({
    dopamine: 1,
    serotonin: 1,
    adrenaline: 1,
  });

  const submitMood = () => {
    const { dopamine, serotonin, adrenaline } = neuroState;

    const submitObj = {
      neurotransmitters: {
        dopamine: dopamine,
        serotonin: serotonin,
        adrenaline: adrenaline,
      },
      moodName: "new-mood",
      timestamp: new Date().toISOString(),
    };

    DatabaseManager.addToDb("mood_records", submitObj);
  };

  return (
    <NeurochemContext.Provider value={{ neuroState, setNeuroState }}>
      <div className="flex flex-col gap-4">
        <Header
          title="Decision Maker"
          description="assess your mood before making a decision."
          isHome={false}
        />
        <Cube />
        <SliderBox />
        <div className="flex justify-between w-10/12 max-w-xl m-auto">
          <Button
            label="Save"
            className="mt-2 px-3 py-1 bg-twd-primary-purple text-white rounded"
            onClick={() => submitMood()}
          />
          <Button
            label="Go to Insights"
            className="mt-2 px-3 py-1 bg-gray-700 text-white rounded"
            onClick={() => router.push("/insights")}
          />
        </div>
      </div>
    </NeurochemContext.Provider>
  );
}
