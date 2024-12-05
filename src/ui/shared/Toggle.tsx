interface ToggleProps {
  isToggled: boolean;
  setIsToggled: (value: boolean) => void;
  toggledOff: string;
  toggledOn: string;
  showLabels: boolean;
}

export default function Toggle({
  isToggled,
  setIsToggled,
  toggledOff,
  toggledOn,
  showLabels,
}: ToggleProps) {
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsToggled(e.target.checked);
    console.log("Toggled:", e.target.checked ? toggledOn : toggledOff);
  };

  const classes =
    "relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-twd-primary-purple rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600";

  return (
    <label
      htmlFor="toggle"
      className="flex justify-center items-center cursor-pointer"
    >
      <span
        className={`mr-3 text-lg font-medium ${
          !isToggled ? "text-purple-500" : ""
        }`}
      >
        {showLabels ? toggledOff : null}
      </span>
      <input
        id="toggle"
        type="checkbox"
        checked={isToggled}
        value={isToggled ? toggledOn.toLowerCase() : toggledOff.toLowerCase()}
        onChange={handleToggle}
        className="sr-only peer"
      />
      <div className={classes}></div>
      <span
        className={`ms-3 text-lg font-medium ${
          isToggled ? "text-purple-500" : ""
        }`}
      >
        {showLabels ? toggledOn : null}
      </span>
    </label>
  );
}
