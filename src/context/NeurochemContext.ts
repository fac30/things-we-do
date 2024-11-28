import { createContext } from "react";

interface NeurochemState {
  dopamine: number;
  serotonin: number;
  adrenaline: number;
}

interface NeurochemContextType {
  neuroState: NeurochemState;
  setNeuroState: React.Dispatch<React.SetStateAction<NeurochemState>>;
}

export const NeurochemContext = createContext<NeurochemContextType | null>(
  null
);
