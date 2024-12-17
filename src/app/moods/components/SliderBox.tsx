import MoodSlider from "./MoodSlider";
import { NeurochemState } from "./MoodsDisplay";

interface SliderBoxProps {
  handleChange: (
    value: number,
    chem: "dopamine" | "serotonin" | "adrenaline"
  ) => void;
  neuroState: NeurochemState;
}

const sliders: {
  chem: "dopamine" | "serotonin" | "adrenaline";
  label: string;
}[] = [
  { chem: "dopamine", label: "Step 1. How urgent does it feel?" },
  { chem: "serotonin", label: "Step 2. How much effort does it take?" },
  { chem: "adrenaline", label: "Step 3. Does it feel worth doing?" },
];

export default function SliderBox({
  handleChange,
  neuroState,
}: SliderBoxProps) {
  return (
    <form className="flex flex-col gap-4 w-10/12 m-auto">
      <fieldset>
        <legend className="m-auto text-xl text-center mb-3 font-semiboldbold">
          How does what you are thinking of doing feel right now?
        </legend>
        {sliders.map((slider) => {
          return (
            <MoodSlider
              key={slider.chem}
              chem={slider.chem}
              label={slider.label}
              handleChange={handleChange}
              neuroState={neuroState}
            />
          );
        })}
      </fieldset>
    </form>
  );
}
