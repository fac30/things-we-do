"use client";
import ImageComponent from "../shared/Image";
import QuestionMarkButton from "../shared/QuestionButton";

const headerClasses = `
  flex items-center justify-between 
  px-4 py-6 shadow-md sm:px-6 sm:py-3`;

const Header = () => {
  return (
    <header className={headerClasses}>
      {/* Left side: App Name and Question Mark */}
      <div className="flex items-center">
        <h1 className="text-lg font-bold text-white sm:text-xl">My Toolkit</h1>
        <QuestionMarkButton
          popupText="This is the Toolkit page where you can add and search tools which help you in your daily life."
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
};

export default Header;
