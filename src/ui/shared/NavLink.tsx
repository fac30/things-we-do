"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface NavLinkProps {
  title?: string;
  Icon?: React.ComponentType<{ className?: string }>; // Typing for Heroicons or similar
  destination: string;
}

export default function NavLink({ title, Icon, destination }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === destination;

  return (
    <Link
      href={destination}
      className={clsx(`flex flex-col items-center rounded-3xl p-1 py-3`, {
        "bg-purple-900": isActive,
      })}
    >
      {Icon && <Icon className="h-6 w-6 text-white" />}
      <p className="text-xs mt-1">{title}</p>
    </Link>
  );
}
