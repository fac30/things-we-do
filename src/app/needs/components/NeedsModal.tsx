"use client";

import Button from "@/ui/shared/Button";
import { ChevronLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface NeedsModalProps {
  modalOpen: boolean;
  title?: string;
  needsStep: number;
  urgent: number;
  effortful: number;
  worthDoing: number;
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
  if (!modalOpen) return null;

  return (
    <div
      className="w-11/12 absolute top-1/2 left-1/2 bg-gray-800 border-[1.5px] rounded-lg -translate-x-1/2 -translate-y-1/2"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        overflow: "hidden",
      }}
    >
      <p className="text-center">Step {needsStep} of 3</p>
      {needsStep > 1 && (
        <button
          className="absolute left-2 top-3"
          onClick={handleBackClick}
          aria-label="Back"
        >
          <ChevronLeftIcon className="h-10 w-10" />
        </button>
      )}
      <button
        className="absolute right-2 top-3"
        onClick={handleCloseClick}
        aria-label="Close"
      >
        <XMarkIcon className="h-10 w-10" />
      </button>

      <div className="flex flex-col w-full items-center py-10 justify-between h-full">
        <p className="text-xl w-10/12 text-center mb-5">{title}</p>
        <p className="text-md w-10/12 text-center mb-10">
          Select the button that best describes meeting this need right now.
        </p>

        <div className="flex justify-center gap-10 w-2/3">
          <Button
            onClick={handleNegativeClick}
            label={negativeLabel}
            className="text-xl font-normal w-36 h-48 bg-twd-secondary-purple text-balance rounded-none"
            aria-label="Negative"
          />
          <Button
            onClick={handlePositiveClick}
            label={positiveLabel}
            className="bg-twd-primary-purple text-xl font-normal w-36 text-balance rounded-none"
            aria-label="Positive"
          />
        </div>
      </div>
    </div>
  );
}
