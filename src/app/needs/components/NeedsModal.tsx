"use client";

import Button from "@/ui/shared/Button";
import { ChevronLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface NeedsModalProps {
  modalOpen: boolean;
  title?: string;
  needsStep: number;
  positiveLabel: string;
  negativeLabel: string;
  handlePositiveClick: () => void;
  handleNegativeClick: () => void;
  handleBackClick: () => void;
  handleCloseClick: () => void;
}

export default function NeedsModal({
  modalOpen,
  title,
  needsStep,
  positiveLabel,
  negativeLabel,
  handlePositiveClick,
  handleNegativeClick,
  handleBackClick,
  handleCloseClick,
}: NeedsModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 transition-opacity duration-300 ${
        modalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`w-11/12 max-w-lg bg-gray-900 border border-gray-700 rounded-lg p-6 shadow-lg transform transition-transform duration-300 ${
          modalOpen ? "scale-100" : "scale-95"
        }`}
      >
        <div className="relative">
          <div className="pt-2">
            <p className="text-center text-white mb-4">Step {needsStep} of 3</p>
          </div>

          {needsStep > 1 && (
            <button
              className="absolute left-0 top-0"
              onClick={handleBackClick}
              aria-label="Back"
            >
              <ChevronLeftIcon className="h-8 w-8 text-white" />
            </button>
          )}

          <button
            className="absolute right-0 top-0"
            onClick={handleCloseClick}
            aria-label="Close"
          >
            <XMarkIcon className="h-8 w-8 text-white" />
          </button>
        </div>

        <div className="flex flex-col w-full items-center py-6 justify-between h-full">
          <p
            className={`text-xl w-10/12 text-center text-white mb-5 ${
              modalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {title}
          </p>

          <p className="text-md w-10/12 text-center text-gray-300 mb-10">
            Select the button that best describes meeting this need right now.
          </p>

          <div className="flex flex-col justify-center gap-6 w-full items-center">
            <Button
              onClick={handleNegativeClick}
              label={negativeLabel}
              className="px-4 py-4 text-xl font-normal text-white bg-gradient-to-l from-twd-primary-purple to-purple-600 rounded-lg w-full text-nowrap"
              aria-label="Negative"
            />

            <Button
              onClick={handlePositiveClick}
              label={positiveLabel}
              className="px-4 py-4 text-xl font-normal text-white bg-gradient-to-r from-twd-primary-purple to-purple-600 rounded-lg w-full text-nowrap"
              aria-label="Positive"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
