import Link from "next/link"; // Import Next.js Link component
import Button from "@/ui/shared/Button";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function FloatingButton() {
  return (
    <Link href="/toolkit/add-tool">
      {/* <Button
        label="+ Add a Tool"
        className="fixed bottom-24 right-4 bg-twd-primary-purple text-white shadow-lg"
      /> */}
      <PlusIcon className="w-16 fixed bottom-20 right-5  shadow-lg text-white bg-twd-primary-purple  p-4 rounded-full" />
    </Link>
  );
}
