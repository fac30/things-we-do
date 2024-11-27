import {
  HomeIcon,
  PresentationChartLineIcon,
  WrenchIcon,
  EllipsisHorizontalCircleIcon,
  ChartBarIcon,
} from "@heroicons/react/16/solid";

const buttons = [
  { title: "Home", icon: HomeIcon },
  { title: "Track", icon: PresentationChartLineIcon },
  { title: "Toolkit", icon: WrenchIcon },
  { title: "Needs", icon: EllipsisHorizontalCircleIcon },
  { title: "Insights", icon: ChartBarIcon },
];

export default function NavbarButtons() {
  return (
    <>
      <div className="flex justify-between items-center h-full w-11/12 m-auto">
        {buttons.map((button, index) => (
          <div key={index} className="flex flex-col items-center">
            <p className="text-white">{button.title}</p>
            <button.icon className="h-6 w-6" color="white" />
          </div>
        ))}
      </div>
    </>
  );
}
