import { createContext, useContext, useState } from "react";

interface AddToolState {
  name: string;
  categories: string[];
  description: string;
  imageUrl: string;
  infoUrl: string;
  pendingCategories: string[];
}

interface AddToolContextType {
  formState: AddToolState;
  setFormState: React.Dispatch<React.SetStateAction<AddToolState>>;
}

const AddToolContext = createContext<AddToolContextType | null>(null);

export function AddToolProvider({ children }: { children: React.ReactNode }) {
  const [formState, setFormState] = useState<AddToolState>({
    name: "",
    categories: [],
    description: "",
    imageUrl: "",
    infoUrl: "",
    pendingCategories: [],
  });

  return (
    <AddToolContext.Provider value={{ formState, setFormState }}>
      {children}
    </AddToolContext.Provider>
  );
}

export function useAddToolForm() {
  const context = useContext(AddToolContext);
  if (!context) {
    throw new Error("useAddToolForm must be used within a AddToolProvider");
  }
  return context;
}