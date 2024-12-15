import Link from "next/link"; // Import Next.js Link component
import { PlusIcon } from "@heroicons/react/24/solid";

export default function FloatingButton() {
  return (
    <Link href="/toolkit/add-tool">
      <PlusIcon
        aria-label="Add New Tool"
        className="w-16 h-16 fixed bottom-20 right-5 shadow-lg text-white 
                   bg-gradient-to-r from-twd-primary-purple to-purple-600 
                   p-4 rounded-full transform transition-all duration-200 ease-in-out"
      />
    </Link>
  );
}
