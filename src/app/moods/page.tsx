"use client";

import { useState } from "react";
import { Cube } from "./components/Cube";
import { SliderBox } from "./components/SliderBox";
import { NeurochemContext, NeurochemState } from "@/context/NeurochemContext";
import Button from "@/ui/shared/Button";
// import databaseManager from "@/lib/db/DatabaseManager";
import { useRouter } from "next/navigation";

export default function MoodsPage() {
  const router = useRouter();
  const [neuroState, setNeuroState] = useState<NeurochemState>({
    dopamine: 5,
    serotonin: 5,
    adrenaline: 5,
  });

  const submitMood = (path: string) => {
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

    router.push(`/${path}`);
  };

  return (
    <NeurochemContext.Provider value={{ neuroState, setNeuroState }}>
      <div className="flex flex-col gap-4">
        <Cube />
        <SliderBox />
        <div className="flex justify-between w-10/12 m-auto">
          <Button
            label="Save and Exit"
            className="border-white border-2 border-solid"
            onClick={() => submitMood("")}
          />
          <Button
            label="Continue to Toolkit"
            className="bg-twd-primary-purple"
            onClick={() => submitMood("toolkit")}
          />
        </div>
      </div>
    </NeurochemContext.Provider>
  );
}
