"use client";

import DatabaseManager from "@/lib/db/DatabaseManager";
import React, { createContext, useContext } from "react";

const DatabaseContext = createContext(DatabaseManager);

export const useDatabase = () => useContext(DatabaseContext);

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <DatabaseContext.Provider value={DatabaseManager}>
      {children}
    </DatabaseContext.Provider>
  );
};
