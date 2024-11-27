import {
  HomeIcon,
  PresentationChartLineIcon,
  WrenchIcon,
  EllipsisHorizontalCircleIcon,
  ChartBarIcon,
} from "@heroicons/react/16/solid";

const buttons = [
  { title: "Home", icon: HomeIcon, destination: "/" },
  { title: "Track", icon: PresentationChartLineIcon, destination: "/track" },
  { title: "Toolkit", icon: WrenchIcon, destination: "/toolkit" },
  { title: "Needs", icon: EllipsisHorizontalCircleIcon, destination: "/needs" },
  { title: "Insights", icon: ChartBarIcon, destination: "/insights" },
];

export default function NavbarButtons() {
  return (
    <div className="grid grid-cols-5 items-center h-full w-11/12 m-auto">
      {buttons.map((button, index) => (
        <div
          key={index}
          className={`flex flex-col items-center ${
            index === 2 ? "col-span-1" : "" // Center the middle button
          }`}
        >
          <p className="text-white">{button.title}</p>
          <button.icon className="h-6 w-6 text-white" />
        </div>
      ))}
    </div>
  );
}
