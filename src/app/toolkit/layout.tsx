"use client";
import { ReactNode } from "react";

export default function Page({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
