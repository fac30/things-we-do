"use client";

import { Cube } from "./Cube";
import { SliderBox } from "./SliderBox";
import MoodButtons from "./MoodButtons";
import DatabaseManager from "@/lib/db/DatabaseManager";
import { useState } from "react";
import { Datum } from "plotly.js";
import Modal from "@/ui/shared/Modal";

export interface NeurochemState {
  dopamine: Datum;
  serotonin: Datum;
  adrenaline: Datum;
}

export default function MoodsDisplay() {
  const [modalOpen, setModalOpen] = useState(false);
  const [neuroState, setNeuroState] = useState<NeurochemState>({
    dopamine: 1,
    serotonin: 1,
    adrenaline: 1,
  });

  const handleChange = (value: number, chem: string) => {
    setNeuroState((prev) => ({
      ...prev,
      [chem]: value,
    }));
  };

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
    setModalOpen(true);
  };

  const forwardButton = {
    label: "continue",
    action: () => setModalOpen(false),
  };
  const backButton = {
    label: "cancel",
    action: () => setModalOpen(false),
  };
  return (
    <>
      <Cube neuroState={neuroState} />
      <SliderBox handleChange={handleChange} neuroState={neuroState} />
      <MoodButtons submitMood={submitMood} />
      <Modal
        modalOpen={modalOpen}
        forwardButton={forwardButton}
        backButton={backButton}
        title={"You've submitted your mood!"}
      />
    </>
  );
}
