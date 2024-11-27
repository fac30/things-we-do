import {
  HomeIcon,
  PresentationChartLineIcon,
  EllipsisHorizontalCircleIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

import Icon from "@/ui/shared/Icon";

import { WrenchIcon } from "@heroicons/react/24/solid";

const buttons = [
  { title: "Home", icon: HomeIcon, destination: "/" },
  { title: "Moods", icon: PresentationChartLineIcon, destination: "/moods" },
  { title: "Toolkit", icon: WrenchIcon, destination: "/toolkit" },
  { title: "Needs", icon: EllipsisHorizontalCircleIcon, destination: "/needs" },
  { title: "Insights", icon: ChartBarIcon, destination: "/insights" },
];

export default function NavbarButtons() {
  return (
    <div className="grid grid-cols-5 items-center h-full w-11/12 m-auto">
      {buttons.map((button, index) => (
        <div key={index} className={`flex flex-col items-center`}>
          <p className="text-white">{button.title}</p>
          <Icon Icon={button.icon} classes="h-6 w-6 text-white" />
        </div>
      ))}
    </div>
  );
}
