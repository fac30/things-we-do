import { Header } from "@/ui/shared/Header";
import NeedsDisplay from "./components/NeedsDisplay";

export default function NeedsPage() {
  return (
    <>
      <Header
        title="Needs"
        description="address unmet needs and assess next actions."
        hasInfoButton={true}
      />
      
      <NeedsDisplay />
    </>
  );
}
