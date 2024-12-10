import Header from "./components/AddToolHeader";
import Inputs from "./components/AddToolInputs";
import { AddToolProvider } from "@/context/AddToolContext";

export default function AddToolPage() {
  return (
    <AddToolProvider>
      <div className="px-4 py-6">
        <Header />
        <Inputs />
      </div>
    </AddToolProvider>
  );
}
