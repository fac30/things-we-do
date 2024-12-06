import { render, screen, fireEvent } from "@testing-library/react";
import { NeurochemContext } from "@/context/NeurochemContext";
import { Cube } from "@/app/moods/components/Cube";
import { SliderBox } from "@/app/moods/components/SliderBox";
import { useState } from "react";
import { Datum } from "plotly.js";

jest.mock("@/ui/shared/PlotlyChart", () => ({
  __esModule: true,
  default: ({ data }: { data: any }) => (
    <div data-testid="plotly-chart" data-prop={JSON.stringify(data)} />
  ),
}));

describe("Cube and SliderBox integration", () => {
  it("updates Plotly chart data when sliders are moved", () => {
    const Wrapper = () => {
      const [neuroState, setNeuroState] = useState<{
        dopamine: Datum;
        serotonin: Datum;
        adrenaline: Datum;
      }>({
        dopamine: 1 as Datum,
        serotonin: 1 as Datum,
        adrenaline: 1 as Datum,
      });

      return (
        <NeurochemContext.Provider value={{ neuroState, setNeuroState }}>
          <Cube />
          <SliderBox />
        </NeurochemContext.Provider>
      );
    };

    render(<Wrapper />);

    // change slider values
    const dopamineSlider = screen.getByLabelText(
      "Step 1. How urgent does it feel?"
    );
    const serotoninSlider = screen.getByLabelText(
      "Step 2. How much effort does it take?"
    );
    const adrenalineSlider = screen.getByLabelText(
      "Step 3. Does it feel worth doing?"
    );

    fireEvent.change(dopamineSlider, { target: { value: "5" } });
    fireEvent.change(serotoninSlider, { target: { value: "3" } });
    fireEvent.change(adrenalineSlider, { target: { value: "7" } });

    // check Plotly chart data prop gets updated
    const plotlyChart = screen.getByTestId("plotly-chart");
    const plotlyData = JSON.parse(
      plotlyChart.getAttribute("data-prop") || "[]"
    );

    const scatterData = plotlyData.find(
      (d: any) => d.type === "scatter3d" && d.mode === "markers"
    );

    expect(scatterData.x).toEqual([7]);
    expect(scatterData.y).toEqual([7]); // Inverted: 10 - 3 = 7
    expect(scatterData.z).toEqual([5]);
  });
});
