"use client";

import { useState } from "react";
import { Header } from "../../ui/shared/Header";
import { Cube } from "./components/Cube";
import { SliderBox } from "./components/SliderBox";
import { NeurochemContext, NeurochemState } from "@/context/NeurochemContext";
import Button from "@/ui/shared/Button";
import { addToDb } from "@/models/addToDb";
import { useRouter } from "next/navigation";

import { PresentationChartLineIcon } from "@heroicons/react/24/outline";

export default function MoodsPage() {
  const router = useRouter();
  const [neuroState, setNeuroState] = useState<NeurochemState>({
    dopamine: 1,
    serotonin: 1,
    adrenaline: 1,
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

    addToDb("mood_records", submitObj);

    router.push(`/${path}`);
  };

  return (
    <NeurochemContext.Provider value={{ neuroState, setNeuroState }}>
      <div className="flex flex-col gap-4">
        <Header
          title="Decision maker"
          description="assess your mood before making a decision."
          Icon={PresentationChartLineIcon}
        />
        <Cube />
        <SliderBox />
        <div className="flex justify-between w-10/12 max-w-xl m-auto">
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
