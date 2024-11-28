"use client";

import { createContext, useState } from "react";
import { Cube } from "./components/Cube";
import { SliderBox } from "./components/SliderBox";
import { Datum } from "plotly.js";

interface NeurochemState {
  dopamine: Datum;
  serotonin: Datum;
  adrenaline: Datum;
}

interface NeurochemContextType {
  neuroState: NeurochemState;
  setNeuroState: React.Dispatch<React.SetStateAction<NeurochemState>>;
}

export const NeurochemContext = createContext<NeurochemContextType | null>(
  null
);

export default function MoodsPage() {
  const [neuroState, setNeuroState] = useState<NeurochemState>({
    dopamine: 5,
    serotonin: 5,
    adrenaline: 5,
  });

  return (
    <NeurochemContext.Provider value={{ neuroState, setNeuroState }}>
      <div className="flex flex-col gap-4">
        <Cube />
        <SliderBox />
      </div>
    </NeurochemContext.Provider>
  );
}
