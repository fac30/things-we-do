import { ReactNode } from "react"
import Header from "../../ui/layout/ToolkitHeader"
import CategoryBar from "../../ui/CategoryBar/CategoryBar"
import SearchBar from "./components/SearchBar"
import CheckBox from "./components/CheckBox"
import FloatingButton from "./components/floatingButton"

export default function ToolkitLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full">
      {/* Shared Header and CategoryBar */}
      <Header />
      <CategoryBar />

      {/* Shared SearchBar and CheckBox */}
      <div className="p-4">
        <SearchBar />
        <CheckBox />
      </div>

      {/* Page-specific content */}
      <div className="flex-1 overflow-auto">{children}</div>

      {/* Floating Button */}
      <FloatingButton />
    </div>
  )
}
