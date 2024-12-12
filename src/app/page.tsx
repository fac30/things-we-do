import { Header } from "@/ui/shared/Header";
import HomePage from "@/ui/shared/HomePage";

export default function Page() {

  return (
    <>
      <Header title="Home" description="" hasInfoButton={false} />
      <HomePage />
    </>
  );
}
