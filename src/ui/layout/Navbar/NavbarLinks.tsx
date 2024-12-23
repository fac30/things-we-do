"use client";

import {
  HomeIcon,
  PresentationChartLineIcon,
  ChartBarIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/outline";
import { WrenchIcon } from "@heroicons/react/24/solid";

import NavLink from "../../shared/NavLink";

const links = [
  { title: "Home", icon: HomeIcon, destination: "/" },
  { title: "Track", icon: PresentationChartLineIcon, destination: "/moods" },
  {
    title: "Toolkit",
    icon: WrenchIcon,
    destination: "/toolkit",
    isToolkit: true,
  },
  { title: "Needs", icon: PuzzlePieceIcon, destination: "/needs" },
  { title: "Insights", icon: ChartBarIcon, destination: "/insights" },
];

export default function NavbarLinks() {
  return (
    <div className="flex justify-between items-center h-full w-11/12 m-auto">
      {links.map((link, index) => (
        <NavLink
          key={index}
          title={link.title}
          Icon={link.icon}
          destination={link.destination}
          isToolkit={link.isToolkit}
        />
      ))}
    </div>
  );
}
