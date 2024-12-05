import CategoryBar from "@/app/toolkit/components/CategoryBar";
import SearchBar from "@/app/toolkit/components/SearchBar";
import ToolList from "@/app/toolkit/components/ToolList";
import FloatingButton from "@/app/toolkit/components/floatingButton";

export default function ToolkitPage() {
  return (
    <div className="relative h-full">
      {/* Shared Header and CategoryBar */}
      <CategoryBar />

      {/* Shared SearchBar and CheckBox */}
      <div className="p-4">
        <SearchBar />
        <ToolList />
      </div>

      {/* Floating Button */}
      <FloatingButton />
    </div>
  );
}
