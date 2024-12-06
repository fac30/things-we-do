import { Header } from "../../ui/shared/Header";
import MoodsDisplay from "./components/MoodsDisplay";

export default function MoodsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Header
        title="Decision Maker"
        description="assess your mood before making a decision."
        isHome={false}
      />
      <MoodsDisplay />
    </div>
  );
}
