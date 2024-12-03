"use client";

import { useEffect } from "react";
import rxdbInit from "./rxdbInit";

export default function DatabaseInitializer() {
  useEffect(() => {
    const init = async () => {
      try {
        await rxdbInit();
        console.log("Database initialized successfully!");
      } catch (error) {
        console.error("Database initialization error:", error);
      }
    };

    init();
  }, []);

  return null;
}
