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
      className={clsx(
        `flex flex-col items-center justify-center w-14 h-14 text-gray-400`,
        {
          " text-white": isActive,
        }
      )}
    >
      {Icon && <Icon className="h-7 w-7" />}
      <p className="text-xs mt-1">{title}</p>
    </Link>
  );
}
