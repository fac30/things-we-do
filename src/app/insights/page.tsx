import { Header } from "@/ui/shared/Header";
import InsightsDisplay from "./components/InsightsDisplay";

export default function InsightsPage() {
  return (
    <>
      <Header
        title="Insights"
        description="analyse your moods and needs over time."
        hasInfoButton={true}
      />
      <InsightsDisplay />
    </>
  );
}
