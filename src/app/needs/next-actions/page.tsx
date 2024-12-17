import { Header } from "@/ui/shared/Header";
import NextActionsDisplay from "./components/NextActionsDisplay";

export default function NextActionsPage() {
  return (
    <>
      <Header title="Next Actions" isInfoPage={true} />
      
      <p className="w-11/12 m-auto mb-5">
        Add your own next actions to meet the needs that you selected:
      </p>

      <NextActionsDisplay />
    </>
  );
}