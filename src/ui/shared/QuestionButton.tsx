'use client'
import { useState, useEffect, useRef } from "react";

interface QuestionMarkButtonProps {
    popupText: string;
    direction?: "top" | "right" | "bottom" | "left";
  }
  export default function QuestionMarkButton({
    popupText,
    direction = "top",
  }: QuestionMarkButtonProps) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Close the popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        closePopup();
      }
    };

    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen]);

  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 transform -translate-x-1/2", // Popup above button
    right: "left-full ml-2 top-1/2 transform -translate-y-1/2", // Popup to the right of button
    bottom: "top-full mt-2 left-1/2 transform -translate-x-1/2", // Popup below button
    left: "right-full mr-2 top-1/2 transform -translate-y-1/2", // Popup to the left of button
  };

  return (
    <div className="relative">
      {/* Question Mark Button */}
      <button
        onClick={togglePopup}
        className="flex items-center justify-center w-8 h-8 border-2 border-twd-background rounded-full text-white font-bold hover:bg-white hover:text-black transition"
      >
        ?
      </button>

      {isPopupOpen && (
        <div
          ref={popupRef}
          className={`absolute z-10 w-64 p-4 bg-gray-800 text-white rounded-lg shadow-lg ${positionClasses[direction]}`}
        >
          <p className="text-sm">{popupText}</p>
          <button
            onClick={closePopup}
            className="mt-2 px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}