import { Header } from "@/ui/shared/Header";
import HomeContent from "./home/components/HomeContent";

export default function Page() {
  return (
    <>
      <Header title="Home" description="" hasInfoButton={false} />
      <HomeContent />
    </>
  );
}
