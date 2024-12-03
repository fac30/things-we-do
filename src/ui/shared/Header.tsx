"use client";
import ImageComponent from "../shared/Image";
import QuestionMarkButton from "../shared/QuestionButton";

interface HeaderProps {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
}

export function Header({ title, description, Icon }: HeaderProps) {
  return (
    <header className="flex items-center justify-between pl-4 py-1 shadow-md">
      {/* Left side: Icon, tab Name and Question Mark with info */}
      <div className="flex items-center align-middle gap-1">
        {Icon && <Icon className="h-6 w-6 text-white" />}
        <h1 className="text-lg font-bold text-white sm:text-xl">{title}</h1>
        <QuestionMarkButton
          popupText={`This is the ${title} page where you can ${description}`}
          direction="bottom"
        />
      </div>
      {/* Right side: Image */}
      <div className="relative w-10 h-10 sm:w-12 sm:h-12">
        <ImageComponent
          src="/icons/dummy_img.png"
          alt="Logo"
          sizes="(max-width: 768px) 100vw, 50vw"
          rounded={false}
        />
      </div>
    </header>
  );
}
