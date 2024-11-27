"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface NavbarButtonProps {
  title: string;
  Icon: React.ComponentType<{ className?: string }>; // Typing for Heroicons or similar
  destination: string;
}

export default function NavigationLink({
  title,
  Icon,
  destination,
}: NavbarButtonProps) {
  const pathname = usePathname();
  const isActive = pathname === destination;

  return (
    <Link
      href={destination}
      className={clsx(`flex flex-col items-center rounded-3xl p-1 py-3`, {
        "bg-purple-900": isActive,
      })}
    >
      <p className="text-white">{title}</p>
      <Icon className="h-6 w-6 text-white" />
    </Link>
  );
}
