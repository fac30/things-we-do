import CategoryBar from "@/app/toolkit/components/CategoryBar";
import SearchBar from "@/app/toolkit/components/SearchBar";
import CheckBox from "@/app/toolkit/components/CheckBox";
import FloatingButton from "@/app/toolkit/components/floatingButton";
import { Header } from "@/ui/shared/Header";

export default function ToolkitPage() {
  return (
    <div className="relative h-full">
      <Header
        title="Toolkit"
        description="add and search tools which help you in your daily life."
        isHome={false}
      />
      <CategoryBar />
      <div className="p-4">
        <SearchBar />
        <CheckBox />
      </div>
      <FloatingButton />
    </div>
  );
}
