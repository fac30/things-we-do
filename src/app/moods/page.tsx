import { Header } from "../../ui/shared/Header";
// import MoodsDisplay from "./components/MoodsDisplay";
// import { Suspense, lazy } from "react";
import dynamic from "next/dynamic";

const MoodsDisplay = dynamic(() => import("./components/MoodsDisplay"), {
  ssr: false, // Disables SSR for this component
});

// const MoodsDisplay = lazy(() => import("./components/MoodsDisplay"));

export default function MoodsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Header
        title="Decision Maker"
        description="assess your mood before making a decision."
        hasInfoButton={true}
      />
      {/* <Suspense fallback={<div>Loading moods...</div>}> */}
      <MoodsDisplay />
      {/* </Suspense> */}
    </div>
  );
}
