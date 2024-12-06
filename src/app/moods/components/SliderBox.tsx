"use client";

import { Slider } from "./Slider";
import { Datum } from "plotly.js";

interface SliderBoxProps {
  handleChange: (
    value: number,
    chem: "dopamine" | "serotonin" | "adrenaline"
  ) => void;
  neuroState: {
    dopamine: Datum;
    serotonin: Datum;
    adrenaline: Datum;
  };
}

export function SliderBox({ handleChange, neuroState }: SliderBoxProps) {
  return (
    <form className="flex flex-col gap-4 w-10/12 m-auto">
      <fieldset>
        <legend className="m-auto text-xl text-center mb-3 font-semiboldbold">
          How does this task feel right now?
        </legend>
        <Slider
          chem="dopamine"
          label="Step 1. How urgent does it feel?"
          handleChange={handleChange}
          neuroState={neuroState}
        />
        <Slider
          chem="serotonin"
          label="Step 2. How much effort does it take?"
          handleChange={handleChange}
          neuroState={neuroState}
        />
        <Slider
          chem="adrenaline"
          label="Step 3. Does it feel worth doing?"
          handleChange={handleChange}
          neuroState={neuroState}
        />
      </fieldset>
    </form>
  );
}
