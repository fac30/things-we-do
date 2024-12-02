"use client";

import { useState } from "react";
import { Cube } from "./components/Cube";
import { SliderBox } from "./components/SliderBox";
import { NeurochemContext, NeurochemState } from "@/context/NeurochemContext";
import Button from "@/ui/shared/Button";
import { addMoodRecord } from "@/models/moodRecordModel";

export default function MoodsPage() {
  const [neuroState, setNeuroState] = useState<NeurochemState>({
    dopamine: 5,
    serotonin: 5,
    adrenaline: 5,
  });

  const submitMood = () => {
    addMoodRecord(neuroState);
    console.log(neuroState);
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
          />
          <Button
            label="Continue to Toolkit"
            className="bg-twd-primary-purple"
            onClick={submitMood}
          />
        </div>
      </div>
    </NeurochemContext.Provider>
  );
}
