import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MoodSlider } from "@/app/moods/components/Slider";
import MoodsDisplay from "@/app/moods/components/MoodsDisplay";

// Mock Plotly component to capture data changes
const MockPlotlyChart = ({ neuroState }: { neuroState: NeurochemState }) => {
  // Simple type guard and conversion function
  const toNumber = (value: unknown): number => {
    if (value === null || value === undefined) return 1;
    if (typeof value === "number") return value;
    if (value instanceof Date) return value.getTime();
    return 1;
  };

  const plotData = [
    {
      type: "scatter3d",
      mode: "markers",
      x: [toNumber(neuroState.adrenaline)],
      y: [10 - toNumber(neuroState.serotonin)],
      z: [toNumber(neuroState.dopamine)],
      marker: { size: 10 },
    },
  ];

  return (
    <div
      data-testid="plotly-chart"
      data-prop={JSON.stringify(plotData)}
      data-x={plotData[0].x[0]}
      data-y={plotData[0].y[0]}
      data-z={plotData[0].z[0]}
    >
      Mocked Plotly Chart
    </div>
  );
};

describe("Cube and SliderBox integration", () => {
  it("updates Plotly chart data when sliders are moved", () => {
    const Wrapper = () => {
      const [neuroState, setNeuroState] = useState<NeurochemState>({
        dopamine: 1,
        serotonin: 1,
        adrenaline: 1,
      });

      const handleChange = (value: number, chem: keyof NeurochemState) => {
        setNeuroState((prev) => ({
          ...prev,
          [chem]: value,
        }));
      };

      return (
        <>
          <MockPlotlyChart neuroState={neuroState} />
          <MoodSlider
            chem="dopamine"
            label="Step 1. How urgent does it feel?"
            handleChange={handleChange}
            neuroState={neuroState}
          />
          <MoodSlider
            chem="serotonin"
            label="Step 2. How much effort does it take?"
            handleChange={handleChange}
            neuroState={neuroState}
          />
          <MoodSlider
            chem="adrenaline"
            label="Step 3. Does it feel worth doing?"
            handleChange={handleChange}
            neuroState={neuroState}
          />
        </>
      );
    };

    render(<Wrapper />);

    const dopamineSlider = screen.getByLabelText(
      "Step 1. How urgent does it feel?"
    );
    const serotoninSlider = screen.getByLabelText(
      "Step 2. How much effort does it take?"
    );
    const adrenalineSlider = screen.getByLabelText(
      "Step 3. Does it feel worth doing?"
    );

    // Change slider values
    fireEvent.change(dopamineSlider, { target: { value: "5" } });
    fireEvent.change(serotoninSlider, { target: { value: "3" } });
    fireEvent.change(adrenalineSlider, { target: { value: "7" } });

    // Get the Plotly chart data
    const plotlyChart = screen.getByTestId("plotly-chart");

    // Verify chart data updates using data attributes
    expect(plotlyChart.getAttribute("data-x")).toBe("7");
    expect(plotlyChart.getAttribute("data-y")).toBe("7"); // 10 - 3 = 7
    expect(plotlyChart.getAttribute("data-z")).toBe("5");
  });
});
