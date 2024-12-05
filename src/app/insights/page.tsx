import InsightsDisplay from "./components/InsightsDisplay";

export default function InsightsPage() {
  return (
    <>
      <div className="flex items-center h-24">
        <h1 className="text-white text-3xl ml-8">Insights</h1>
      </div>
      <InsightsDisplay />
    </>
  );
}
