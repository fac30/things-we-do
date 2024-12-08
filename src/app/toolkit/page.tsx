"use client";
import CategoriesBar from "@/app/toolkit/components/CategoriesBar";
import ToolList from "@/app/toolkit/components/ToolList";
import FloatingButton from "@/app/toolkit/components/floatingButton";
import { Header } from "@/ui/shared/Header";
import { ToolkitProvider } from "@/context/ToolkitContext";

export default function ToolkitPage() {
  return (
    <ToolkitProvider>
      <div className="relative h-full">
        <Header
          title="Toolkit"
          description="add and search tools which help you in your daily life."
          isHome={false}
        />
        <CategoriesBar />
        <div className="p-4">
          <ToolList />
        </div>
        <FloatingButton />
      </div>
    </ToolkitProvider>
  );
}
