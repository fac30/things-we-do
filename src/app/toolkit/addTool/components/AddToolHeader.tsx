"use client";

import NavLink from "@/ui/shared/NavLink";
import Spacer from "./Spacer";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <div className="flex justify-around">
      <NavLink Icon={XMarkIcon} destination="/toolkit" />
      <h2 className="text-white text-2xl font-bold">Add Tool</h2>
      <Spacer />
    </div>
  );
}