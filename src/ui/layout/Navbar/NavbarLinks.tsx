"use client";

import {
  HomeIcon,
  PresentationChartLineIcon,
  EllipsisHorizontalCircleIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { WrenchIcon } from "@heroicons/react/24/solid";

import NavigationLink from "../../shared/NavLink";

const links = [
  { title: "Home", icon: HomeIcon, destination: "/" },
  { title: "Moods", icon: PresentationChartLineIcon, destination: "/moods" },
  { title: "Toolkit", icon: WrenchIcon, destination: "/toolkit" },
  { title: "Needs", icon: EllipsisHorizontalCircleIcon, destination: "/needs" },
  { title: "Insights", icon: ChartBarIcon, destination: "/insights" },
];

export default function NavbarLinks() {
  return (
    <div className="grid grid-cols-5 items-center h-full w-11/12 m-auto">
      {links.map((link, index) => (
        <NavigationLink
          key={index}
          title={link.title}
          Icon={link.icon}
          destination={link.destination}
        />
      ))}
    </div>
  );
}
