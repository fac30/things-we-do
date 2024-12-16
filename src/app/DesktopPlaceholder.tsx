"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function DesktopPlaceholder() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    // Function to check if the media query matches
    const checkDesktop = (e?: MediaQueryListEvent | MediaQueryList) => {
      if (!e) return;
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
    <>
      <div className="hidden md:absolute md:block h-screen w-screen blur-sm  bg-gradient-to-r from-twd-primary-purple to-purple-500 z-[99998]"></div>
      <div className="hidden md:absolute md:block top-1/2 left-1/2 h-5/6 w-11/12 overflow-hidden -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-[#1B192E] to-[#25233A] shadow-2xl border- rounded-lg z-[99999]">
        <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl flex gap-20 flex-col w-11/12 items-center">
          <h2>Thanks for visiting Things We Do</h2>
          <p className="text-3xl leading-10">
            At the moment, we&apos;re optimised for mobile and tablet devices.
            For the best experience, please visit us on your mobile or tablet
            using the QR code below.
          </p>
          <div className="bg-white w-72 h-72 rounded-3xl flex justify-center items-center">
            <Image
              src="/images/qr-code.png"
              width={250}
              height={250}
              alt="QR code for website URL"
            />
          </div>
        </div>
      </div>
    </>
  );
}
