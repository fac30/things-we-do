import { Header } from "../../ui/shared/Header";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      <Header
        title="Home Page"
        description="assess your mood before making a decision."
        hasInfoButton={true}
      />
    </div>
  );
}