"use client";

import React, { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;

const DownloadButton: React.FC = () => {
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [buttonText, setButtonText] = useState("Install App");

  useEffect(() => {
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as Window & typeof globalThis & { MSStream?: unknown }).MSStream;

    if (isIOSDevice) {
      setIsIOS(true);
      setShowInstallButton(true);
      setButtonText("Install on iOS");
      return;
    }

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      deferredPrompt = e;
      setShowInstallButton(true);
      setButtonText("Install App");
    };

    const handleAppInstalled = () => {
      setShowInstallButton(false);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener
    );
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      alert(
        'To install this app on iOS:\n1. Tap the Share button\n2. Select "Add to Home Screen"\n3. Tap "Add"'
      );
      return;
    }

    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      deferredPrompt = null;
      setShowInstallButton(false);
    }
  };

  if (!showInstallButton) return null;

  return (
    <div className="fixed top-0 w-[200px] z-[999] -translate-x-1/2 left-1/2 shadow-xl">
      <button
        onClick={handleInstallClick}
        className="
          w-full 
          whitespace-normal 
          min-h-[48px] 
          h-auto 
          px-6 
          py-3 
  bg-gradient-to-r from-twd-primary-purple to-purple-600 
          text-white 
          rounded-lg 
          hover:bg-blue-600 
          transition-colors
          flex 
          items-center 
          justify-center
          rounded-t-none
        "
      >
        {buttonText}
      </button>
    </div>
  );
};

export default DownloadButton;
