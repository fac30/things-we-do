"use client";
import { ReactNode } from "react";
import Header from "./components/ToolkitHeader";

export default function Page({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>{children}</div>
    </div>
  );
}
