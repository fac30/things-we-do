import { createContext } from "react";
import { Datum } from "plotly.js";

export interface NeurochemState {
  dopamine: Datum;
  serotonin: Datum;
  adrenaline: Datum;
}

export interface NeurochemContextType {
  neuroState: NeurochemState;
  setNeuroState: React.Dispatch<React.SetStateAction<NeurochemState>>;
}

export const NeurochemContext = createContext<NeurochemContextType | null>(
  null
);
