"use client";

import { useEffect } from "react";

export default function DesktopPlaceholder() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    // Function to check if the media query matches
    const checkDesktop = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.body.classList.add("device-desktop-body");
      } else {
        document.body.classList.remove("device-desktop-body");
      }
    };

    // Run on initial load
    checkDesktop(mediaQuery);

    // Add event listener for when the screen size changes
    mediaQuery.addEventListener("change", checkDesktop);

    // Cleanup the event listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", checkDesktop);
    };
  }, []);

  return (
    <div className="hidden md:absolute md:block top-1/2 left-1/2 h-5/6 w-11/12 overflow-hidden -translate-x-1/2 -translate-y-1/2 bg-twd-primary-purple z-[9999]">
      <p className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl">
        fuck off
      </p>
    </div>
  );
}
