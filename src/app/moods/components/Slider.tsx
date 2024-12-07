import { NeurochemState } from "./MoodsDisplay";

interface SliderProps {
  chem: "dopamine" | "serotonin" | "adrenaline";
  label: string;
  handleChange: (
    value: number,
    chem: "dopamine" | "serotonin" | "adrenaline"
  ) => void;
  neuroState: NeurochemState;
}
export function Slider({ chem, label, handleChange, neuroState }: SliderProps) {
  const normaliseValue = (value: unknown): number => {
    if (value instanceof Date) return value.getTime();
    if (typeof value === "number") return value;
    return 1;
  };

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
      <label htmlFor={chem} className="text-white text-md mb-4">
        {label}
      </label>
      <input
        id={chem}
        type="range"
        min="1"
        max="10"
        value={normaliseValue(neuroState[chem])}
        onChange={(e) => handleChange(parseInt(e.target.value), chem)}
        className="w-full m-auto range-slider"
      />
      <div className="flex justify-between mt-4 w-full m-auto">
        {renderText}
      </div>
    </div>
  );
}
