"use client";

import { useContext } from "react";
import { NeurochemContext } from "../page";

interface SliderProps {
  chem: "dopamine" | "serotonin" | "adrenaline";
  label: string;
}

export function Slider({ chem, label }: SliderProps) {
  const context = useContext(NeurochemContext);

  if (!context) {
    throw new Error("Slider must be used within a NeurochemContext Provider");
  }

  const { neuroState, setNeuroState } = context;

  const handleChange = (value: number) => {
    setNeuroState((prev) => ({
      ...prev,
      [chem]: value,
    }));
  };

  return (
    <div className="flex flex-col">
      <label className="text-white">{label}</label>
      <input
        type="range"
        min="1"
        max="10"
        value={neuroState[chem]}
        onChange={(e) => handleChange(parseInt(e.target.value))}
        className="w-11/12 m-auto"
      />
    </div>
  );
}
