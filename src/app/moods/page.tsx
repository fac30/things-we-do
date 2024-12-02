"use client";

import { useState } from "react";
import { Cube } from "./components/Cube";
import { SliderBox } from "./components/SliderBox";
import { NeurochemContext, NeurochemState } from "@/context/NeurochemContext";
import Button from "@/ui/shared/Button";
import { addToDb } from "@/models/addToDb";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

export default function MoodsPage() {
  const router = useRouter(); // Initialize useRouter hook
  const [neuroState, setNeuroState] = useState<NeurochemState>({
    dopamine: 5,
    serotonin: 5,
    adrenaline: 5,
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

    addToDb("mood_records", submitObj);

    router.push("/toolkit"); // Navigate to the toolkit page
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
