import { Header } from "@/ui/shared/Header";
import HomeContent from "./home/components/HomeContent";
import DownloadButton from "./home/components/DownloadButton";

export default function Page() {
  return (
    <>
      <Header title="Home" description="" hasInfoButton={false} />
      <DownloadButton />
      <HomeContent />
    </>
  );
}
