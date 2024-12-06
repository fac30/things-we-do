import { createContext, useContext, useState, ReactNode } from "react";

interface ToolkitContextType {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

const ToolkitContext = createContext<ToolkitContextType | null>(null);

export function ToolkitProvider({ children }: { children: ReactNode }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <ToolkitContext.Provider value={{ selectedCategories, setSelectedCategories }}>
      {children}
    </ToolkitContext.Provider>
  );
}

export function useToolkit() {
  const context = useContext(ToolkitContext);
  if (!context) {
    throw new Error("useToolkit must be used within a ToolkitProvider");
  }
  return context;
} 