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

  const normaliseValue = (value: unknown): number => {
    if (value instanceof Date) return value.getTime(); // Convert Date to timestamp
    if (typeof value === "number") return value; // Use number as-is
    return 1; // Fallback default
  };

  const renderText =
    label === "Step 2. How much effort does it take?" ? (
      <>
        <p className="text-xs">None</p>
        <p className="text-xs">A lot</p>
      </>
    ) : (
      <>
        <p className="text-xs">Not at all</p>
        <p className="text-xs">Very</p>
      </>
    );

  return (
    <div className="flex flex-col mb-5">
      <label className="text-white mb-6 text-md">{label}</label>
      <input
        type="range"
        min="1"
        max="10"
        value={normaliseValue(neuroState[chem])}
        onChange={(e) => handleChange(parseInt(e.target.value))}
        className="w-11/12 m-auto range-slider"
      />
      <div className="flex justify-between mt-6 w-full m-auto">
        {renderText}
      </div>
    </div>
  );
}
