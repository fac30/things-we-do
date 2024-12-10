
import { Header } from "@/ui/shared/Header";
import { ToolkitProvider } from "@/context/ToolkitContext";
import ToolkitDisplay from "./components/ToolkitDisplay";


export default function ToolkitPage() {

  return (
    <ToolkitProvider>
      <div className="relative h-full">
        <Header
          title="Toolkit"
          description="add and search tools which help you in your daily life."
          hasInfoButton={true}
        />
        <ToolkitDisplay />
      </div>
    </ToolkitProvider>
  );
}
