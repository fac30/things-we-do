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
      <h2 className="text-2xl w-11/12 mb-6 mt-4 m-auto">
        What do you need right now?
      </h2>
      <p className="w-11/12 m-auto mb-5">
        Select what you need from the list below
      </p>
      <NeedsDisplay />
    </>
  );
}
