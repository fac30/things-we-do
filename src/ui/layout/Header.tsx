const headerClasses = 'flex items-center justify-between px-4 py-6 shadow-md sm:px-6 sm:py-3';
const buttonHeaderClass = "ml-2 flex items-center justify-center w-6 h-6 text-white rounded-full bg-#1b192e hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-8 sm:h-8";


const Header: React.FC = () => {

  return (
    <header className={headerClasses}>
      {/* Left side: App Name and Question Mark */}
      <div className="flex items-center">
        <h1 className="text-lg font-bold text-white sm:text-xl">
          Things We Do
        </h1>
        <button
          type="button"
          className = {buttonHeaderClass}
          aria-label="Help"
        >
          ?
        </button>
      </div>

      {/* Right side: Image */}
      <div>
        <img
          src="/path-to-your-image.jpg"
          alt="Profile"
          className="w-8 h-8 rounded-full sm:w-10 sm:h-10"
        />
      </div>
    </header>
  );
};

export default Header;
