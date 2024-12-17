import { NeurochemState } from "./MoodsDisplay";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";
import clsx from "clsx";

interface SliderProps {
  chem: "dopamine" | "serotonin" | "adrenaline";
  label: string;
  handleChange: (
    value: number,
    chem: "dopamine" | "serotonin" | "adrenaline"
  ) => void;
  neuroState: NeurochemState;
}
export default function MoodSlider({ chem, label, handleChange }: SliderProps) {
  const [isActive, setIsActive] = useState(false);

  const renderText =
    label === "Step 2. How much effort does it take?" ? (
      <>
        <p className="text-xs">None</p>
        <p className="text-xs">A lot</p>
      </>
    ) : (
      <>
        <p className="text-xs">Not at all</p>
        <p className="text-xs">Very</p>
      </>
    );

  return (
    <div
      className={clsx("flex flex-col py-2 px-3 rounded-lg", {
        "bg-gray-900": isActive,
      })}
    >
      <label
        id={`label-${chem}`}
        htmlFor={`slider-${chem}`}
        className={clsx("text-md mb-4", {})}
      >
        {label}
      </label>
      <Slider
        data-testid={`slider-${chem}`}
        id={`slider-${chem}`}
        aria-labelledby={`label-${chem}`}
        onChange={(value) => {
          handleChange(value as number, chem);
          setIsActive(true);
        }} // Ensure the value is a number
        onChangeComplete={() => setIsActive(false)}
        styles={{
          rail: { backgroundColor: "#3C246C" },
          track: { backgroundColor: "#893FFC" },
          handle: {
            backgroundColor: "#893FFC",
            border: "#ffc100",
            height: "18px",
            width: "18px",
            transform: "translate(-10px, -2px)", // Corrected transform syntax
            opacity: 1,
          },
        }}
        min={1}
        max={10}
      />
      <div className="flex justify-between mt-4 w-full m-auto">
        {renderText}
      </div>
    </div>
  );
}
