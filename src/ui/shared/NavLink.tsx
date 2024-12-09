"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface NavLinkProps {
  title?: string;
  Icon?: React.ComponentType<{ className?: string }>;
  destination: string;
  isToolkit?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export default function NavLink({
  title,
  Icon,
  destination,
  isToolkit,
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();

  const isActive =
    pathname === destination || pathname.startsWith(`${destination}/`);
  return (
    <Link
      href={destination}
      onClick={onClick}
      className={clsx(
        `flex flex-col items-center justify-center w-14 h-14 text-gray-400 relative`,
        {
          "text-white": isActive,
          "!bg-gray-200 !text-twd-primary-purple": isActive && isToolkit,
          "border-twd-primary-purple border-solid border-[3px] rounded-full p-10 bg-twd-navbar-background shadow-[0px_0px_8px_2px_rgba(137,63,252)] -translate-y-4":
            isToolkit,
        }
      )}
    >
      {isActive && !isToolkit && (
        <span
          className="absolute top-[-5.5px] left-0 w-full h-[2.5px] bg-white "
          style={{ boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)" }}
        />
      )}
      {Icon && (
        <Icon
          className={clsx("flex-shrink-0", {
            "h-7 w-7": !isToolkit,
            "h-9 w-9": isToolkit,
          })}
        />
      )}

      {!isToolkit && <p className="text-xs mt-1">{title}</p>}
    </Link>
  );
}
