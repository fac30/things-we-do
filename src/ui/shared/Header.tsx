"use client";
import InfoButton from "./InfoButton";

interface HeaderProps {
  title: string;
  description?: string;
  hasInfoButton?: boolean;
  isInfoPage?: boolean;
}

export function Header({
  title,
  description,
  hasInfoButton,
  isInfoPage,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 pt-3 pb-1">
      <div className="flex items-center align-middle gap-1">
        {isInfoPage && <h1 className="mr-auto">hello</h1>}
        <h1 className="text-lg font-bold text-white sm:text-xl">{title}</h1>
      </div>
      {hasInfoButton && (
        <InfoButton
          popupText={`This is the ${title} page where you can ${description}`}
          direction="bottomLeft"
        />
      )}
    </header>
  );
}
