"use client";

import NavLink from "@/ui/shared/NavLink";
import Spacer from "./Spacer";
import { ChevronLeftIcon as ChevronLeft } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <div className="flex justify-around">
      <NavLink Icon={ChevronLeft} destination="/toolkit" />
      <h2 className="text-white text-2xl font-bold">Add Tool</h2>
      <Spacer />
    </div>
  );
}
