"use client";

//import InfoButton from "./InfoButton";

interface HeaderProps {
  title: string;
  description: string;
  isHome: boolean;
}

export function Header({ title, description, isHome }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 pt-3 pb-1">
      <div className="flex items-center align-middle gap-1">
        <h1 className="text-lg font-bold text-white sm:text-xl">{title}</h1>
      </div>
      {/* {!isHome && (
        <InfoButton
          popupText={`This is the ${title} page where you can ${description}`}
          direction="bottomLeft"
        />
      )} */}
    </header>
  );
}
