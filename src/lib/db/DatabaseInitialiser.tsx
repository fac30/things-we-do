"use client";

import { useEffect } from "react";
import rxdbInit from "./rxdbInit";

export default function DatabaseInitializer() {
  useEffect(() => {
    const init = async () => {
      try {
        await rxdbInit();
      } catch (error) {
        console.error(
          "Database initialization error in DatabaseInitialiser:",
          error
        );
      }
    };

    init();
  }, []);

  return null;
}
