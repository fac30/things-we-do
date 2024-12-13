import { NeurochemState } from "./MoodsDisplay";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

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
  // const normaliseValue = (value: unknown): number => {
  //   if (value instanceof Date) return value.getTime();
  //   if (typeof value === "number") return value;
  //   return 1;
  // };

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
    <div className="flex flex-col mb-2">
      <label
        id={`${chem}label`}
        htmlFor={chem}
        className="text-white text-md mb-4"
      >
        {label}
      </label>
      <Slider
        id={chem}
        aria-labelledby={`${chem}label`}
        onChange={(value) => handleChange(value as number, chem)} // Ensure the value is a number
        styles={{
          rail: { backgroundColor: "#3C246C" },
          track: { backgroundColor: "#893FFC" },
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
