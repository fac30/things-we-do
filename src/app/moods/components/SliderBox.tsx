import { Slider } from "./Slider";
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

export function SliderBox({ handleChange, neuroState }: SliderBoxProps) {
  return (
    <form className="flex flex-col gap-4 w-10/12 m-auto">
      <fieldset>
        <legend className="m-auto text-xl text-center mb-3 font-semiboldbold">
          How does this task feel right now?
        </legend>
        {sliders.map((slider) => {
          return (
            <>
              <Slider
                chem={slider.chem}
                label={slider.label}
                handleChange={handleChange}
                neuroState={neuroState}
              />
            </>
          );
        })}
      </fieldset>
    </form>
  );
}
