import { Header } from "@/ui/shared/Header";
import HomeContents from "./home/components/HomeContents";

export default function Page() {
  return (
    <>
      <Header title="Home" description="" hasInfoButton={false} />
      <HomeContents />
    </>
  );
}
