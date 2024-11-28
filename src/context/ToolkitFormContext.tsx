import { createContext, useContext, useState } from "react";

interface ToolkitFormState {
  name: string;
  categories: string[];
  imageUrl: string;
  link: string;
}

interface ToolkitFormContextType {
  formState: ToolkitFormState;
  setFormState: React.Dispatch<React.SetStateAction<ToolkitFormState>>;
}

const ToolkitFormContext = createContext<ToolkitFormContextType | null>(null);

export function ToolkitFormProvider({ children }: { children: React.ReactNode }) {
  const [formState, setFormState] = useState<ToolkitFormState>({
    name: "",
    categories: [],
    imageUrl: "",
    link: "",
  });

  return (
    <ToolkitFormContext.Provider value={{ formState, setFormState }}>
      {children}
    </ToolkitFormContext.Provider>
  );
}

export function useToolkitForm() {
  const context = useContext(ToolkitFormContext);
  if (!context) {
    throw new Error("useToolkitForm must be used within a ToolkitFormProvider");
  }
  return context;
}