"use client";

import { Slider } from "./Slider";

export function SliderBox() {
  return (
    <div className="flex flex-col gap-4 w-10/12 m-auto">
      <h2 className="text-xl text-center mb-6 font-semiboldbold">
        How does this task feel right now?
      </h2>
      <Slider chem="dopamine" label="Step 1. How urgent does it feel?" />
      <Slider chem="serotonin" label="Step 2. How much effort does it take?" />
      <Slider chem="adrenaline" label="Step 3. Does it feel worth doing?" />
    </div>
  );
}
