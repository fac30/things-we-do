"use client";

import { destroyDatabase } from "@/lib/db/rxdbInit";
import Button from "@/ui/shared/Button";

export default function Page() {
  const handleDestroyDB = async () => {
    try {
      await destroyDatabase();
      console.log("Database successfully destroyed");
    } catch (error) {
      console.error("Error destroying database:", error);
    }
  };

  return (
    <>
      <h1 className="text-white">this is the needs page</h1>
      <Button
        label="Destroy Database"
        onClick={handleDestroyDB}
        className="bg-red-500 hover:bg-red-700 text-white"
      />
    </>
  );
}
