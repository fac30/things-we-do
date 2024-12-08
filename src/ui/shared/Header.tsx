"use client";
import InfoButton from "./InfoButton";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

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
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <header className="flex items-center justify-between px-5 pt-3 pb-1">
      <div className="flex items-center align-middle gap-1 w-full">
        {isInfoPage && (
          <button onClick={goBack}>
            {<ChevronLeftIcon className="w-8 h-8" />}
          </button>
        )}
        <h1
          className={clsx("text-lg font-bold text-white sm:text-xl", {
            "ml-auto": isInfoPage,
          })}
        >
          {title}
        </h1>
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
