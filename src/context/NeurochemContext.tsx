// import { createContext, useState, ReactNode } from "react";
// import { Datum } from "plotly.js";

// export interface NeurochemState {
//   dopamine: Datum;
//   serotonin: Datum;
//   adrenaline: Datum;
// }

// export interface NeurochemContextType {
//   neuroState: NeurochemState;
//   setNeuroState: React.Dispatch<React.SetStateAction<NeurochemState>>;
// }

// export const NeurochemContext = createContext<NeurochemContextType | null>(
//   null
// );

// export const NeurochemProvider = ({ children }: { children: ReactNode }) => {
//   const [neuroState, setNeuroState] = useState<NeurochemState>({
//     dopamine: 1,
//     serotonin: 1,
//     adrenaline: 1,
//   });

//   return (
//     <NeurochemContext.Provider value={{ neuroState, setNeuroState }}>
//       {children}
//     </NeurochemContext.Provider>
//   );
// };
