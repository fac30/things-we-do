"use client";

import Cube from "./Cube";
import SliderBox from "./SliderBox";
import MoodButtons from "./MoodButtons";
import { useDatabase } from "@/context/DatabaseContext";
import { useState } from "react";
import { Datum } from "plotly.js";
import Modal from "@/ui/shared/Modal";

export interface NeurochemState {
  dopamine: Datum;
  serotonin: Datum;
  adrenaline: Datum;
}

export default function MoodsDisplay() {
  const database = useDatabase();
  const [modalOpen, setModalOpen] = useState(false);
  const [neuroState, setNeuroState] = useState<NeurochemState>({
    dopamine: 1,
    serotonin: 1,
    adrenaline: 1,
  });

  const handleChange = (value: number | number[], chem: string) => {
    setNeuroState((prev) => ({
      ...prev,
      [chem]: value,
    }));
    console.log(neuroState);
  };

  const submitMood = () => {
    let moodName = "";
    const { dopamine, serotonin, adrenaline } = neuroState as {
      dopamine: number;
      serotonin: number;
      adrenaline: number;
    };

    if (dopamine <= 5) {
      if (adrenaline <= 5) {
        if (serotonin <= 5) {
          moodName = "guilt";
        } else if (serotonin >= 6) {
          moodName = "content";
        }
      } else if (adrenaline >= 6) {
        if (serotonin <= 5) {
          moodName = "distress";
        } else if (serotonin >= 6) {
          moodName = "relief";
        }
      }
    } else if (dopamine >= 6) {
      if (adrenaline <= 5) {
        if (serotonin <= 5) {
          moodName = "freeze";
        } else if (serotonin >= 6) {
          moodName = "joy";
        }
      } else if (adrenaline >= 6) {
        if (serotonin <= 5) {
          moodName = "fight/flight";
        } else if (serotonin >= 6) {
          moodName = "interest";
        }
      }
    }

    const submitObj = {
      neurotransmitters: {
        dopamine: dopamine,
        serotonin: serotonin,
        adrenaline: adrenaline,
      },
      moodName: moodName,
      timestamp: new Date().toISOString(),
    };

    database.addToDb("mood_records", submitObj);
    setModalOpen(true);
  };

  const forwardButton = {
    label: "ok",
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
        title={"You've submitted your mood!"}
      />
    </>
  );
}
