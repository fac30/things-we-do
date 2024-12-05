"use client";

import Link from "next/link"; // Import Next.js Link component
import Button from "@/ui/shared/Button";

export default function FloatingButton() {
  return (
    <Link href="/addTool">
      <Button
        label="Add a Tool"
        className="fixed bottom-20 right-4 bg-blue-500 text-white shadow-lg"
      />
    </Link>
  );
}
