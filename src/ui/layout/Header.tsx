'use client'
import ImageComponent from "../shared/Image";
import Button from "../shared/Button";

const headerClasses = `
  flex items-center justify-between 
  px-4 py-6 shadow-md sm:px-6 sm:py-3`;

const buttonHeaderClass = `
  ml-2 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 
  text-white rounded-full bg-twd-background hover:bg-twd-secondary-purple 
  focus:outline-none focus:ring-2 focus:ring-twd-secondary-purple`;

const Header = () => {
  return (
    <header className={headerClasses}>
      {/* Left side: App Name and Question Mark */}
      <div className="flex items-center">
        <h1 className="text-lg font-bold text-white sm:text-xl">
          Things We Do
        </h1>
        <Button
          label="?"
          className={buttonHeaderClass}
          ariaPressed={false}
          onClick={() => console.log("Help button clicked!")}
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
