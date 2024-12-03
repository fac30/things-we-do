"use client";

import { useContext } from "react";
import { NeurochemContext } from "@/context/NeurochemContext";

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
    if (value instanceof Date) return value.getTime();
    if (typeof value === "number") return value;
    return 1;
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
    <div className="flex flex-col mb-2">
      <label htmlFor={chem} className="text-white text-md mb-4">
        {label}
      </label>
      <input
        id={chem}
        type="range"
        min="1"
        max="10"
        value={normaliseValue(neuroState[chem])}
        onChange={(e) => handleChange(parseInt(e.target.value))}
        className="w-full m-auto range-slider"
      />
      <div className="flex justify-between mt-4 w-full m-auto">
        {renderText}
      </div>
    </div>
  );
}
