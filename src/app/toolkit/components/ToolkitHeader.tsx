"use client";
import ImageComponent from "../../../ui/shared/Image";
import { WrenchIcon } from "@heroicons/react/24/solid";

const headerClasses = `
  flex items-center justify-between 
  px-6 py-8 shadow-md sm:px-6 sm:py-3`;

  const Header = () => {
    return (
      <header className={headerClasses}>
        <div className="flex items-center space-x-2">
          <WrenchIcon className="h-6 w-6 text-white" />
          <h1 className="text-2xl font-bold text-white sm:text-xl">My Toolkit</h1>
        </div>
  

        <div className="w-16 h-16 sm:w-12 sm:h-12">
          <ImageComponent
            src="/icons/image_toolkit.png"
            alt="Logo"
            sizes="(max-width: 768px) 100vw, 50vw"
            rounded={false}
          />
        </div>
      </header>
    );
  };
  
  export default Header;