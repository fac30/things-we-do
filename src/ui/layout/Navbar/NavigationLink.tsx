import Link from "next/link";

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
  return (
    <Link href={destination} className={`flex flex-col items-center`}>
      <p className="text-white">{title}</p>
      <Icon className="h-6 w-6 text-white" />
    </Link>
  );
}
