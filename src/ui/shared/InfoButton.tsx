"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";

interface QuestionMarkButtonProps {
  popupText: string;
  direction?: "top" | "right" | "bottom" | "left" | "bottomLeft";
}

export default function InfoButton({
  popupText,
  direction = "top",
}: QuestionMarkButtonProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);
  const closePopup = () => setIsPopupOpen(false);
  const openInfo = () => {
    const basePath = window.location.pathname.endsWith("/")
      ? window.location.pathname.slice(0, -1)
      : window.location.pathname;
    router.push(`${basePath}/info`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node))
        closePopup();
    };
    if (isPopupOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPopupOpen]);

  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
    right: "left-full ml-2 top-1/2 transform -translate-y-1/2",
    bottom: "top-full mt-2 left-1/2 transform -translate-x-1/2",
    left: "right-full mr-2 top-1/2 transform -translate-y-1/2",
    bottomLeft: "top-full mt-2 left-1/2 transform -translate-x-full",
  };

  return (
    <div className="relative">
      <button
        onClick={togglePopup}
        className="flex items-center justify-center w-8 h-8 border-2 border-twd-background rounded-full text-white font-bold transition"
      >
        {/* <InformationCircleIcon className="text-white !important" /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
      </button>
      {isPopupOpen && (
        <div
          ref={popupRef}
          className={`absolute z-20 w-64 p-4 bg-gray-800 text-white rounded-lg shadow-lg ${positionClasses[direction]}`}
        >
          <p className="text-sm">{popupText}</p>
          <div className="flex justify-between">
            <Button
              onClick={openInfo}
              label="Learn more"
              className="mt-2 px-3 py-1 bg-twd-primary-purple text-white rounded"
            />
            <Button
              onClick={closePopup}
              label="Close"
              className="mt-2 px-3 py-1 bg-gray-700 text-white rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}
