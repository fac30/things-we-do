"use client";

import { useState } from "react";
import { Cube } from "./components/Cube";
import { SliderBox } from "./components/SliderBox";
import { NeurochemContext, NeurochemState } from "@/context/NeurochemContext";
import Button from "@/ui/shared/Button";
import { addToDb } from "@/models/addToDb";
import { useRouter } from "next/navigation";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

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

    addToDb("mood_records", submitObj);

    router.push(`/${path}`);
  };

  return (
    <NeurochemContext.Provider value={{ neuroState, setNeuroState }}>
      <div className="flex flex-col gap-4">
        <Link href={`/moods/learn-more`}>
          <InformationCircleIcon className="h-8 w-8 absolute top-5 right-5 z-50" />
        </Link>
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
