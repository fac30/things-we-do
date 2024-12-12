import { render, screen, fireEvent, act } from "@testing-library/react";
import Cube from "@/app/moods/components/Cube";
import { useState } from "react";
import { Datum } from "plotly.js";

jest.mock("@/ui/shared/PlotlyChart", () => ({
  __esModule: true,
  default: ({ data, onLoaded }: { data: any; onLoaded: () => void }) => {
    setTimeout(onLoaded, 0);
    return <div data-testid="plotly-chart" data-prop={JSON.stringify(data)} />;
  },
}));

describe("Cube label updates on toggle", () => {
  it("updates Plotly chart labels correctly and verifies the toggle value", async () => {
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

      return <Cube neuroState={neuroState} />;
    };

    render(<Wrapper />);

    // Initial check: All labels should render
    const plotlyChart = screen.getByTestId("plotly-chart");
    const toggle = screen.getByRole("checkbox");

    // Check initial toggle value
    expect(toggle).toHaveAttribute("value", "mood");

    let initialData = JSON.parse(plotlyChart.getAttribute("data-prop") || "[]");

    const moodLabels = initialData.filter(
      (d: any) => Array.isArray(d.text) && d.text.includes("Distress")
    );
    const priorityLabels = initialData.filter(
      (d: any) => Array.isArray(d.text) && d.text.includes("Delete it")
    );

    expect(moodLabels).not.toHaveLength(0);
    expect(priorityLabels).not.toHaveLength(0);

    // Wait for the onLoaded callback to trigger
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    // After onLoaded: Priority labels should be hidden
    const updatedDataAfterLoad = JSON.parse(
      plotlyChart.getAttribute("data-prop") || "[]"
    );

    const priorityLabelsAfterLoad = updatedDataAfterLoad.filter(
      (d: any) => Array.isArray(d.text) && d.text.every((t: string) => t === "")
    );

    expect(
      priorityLabelsAfterLoad.every((d: any) =>
        d.text.every((t: string) => t === "")
      )
    ).toBe(true);

    // Toggle to switch to Priority labels
    fireEvent.click(toggle);

    // Check updated toggle value
    expect(toggle).toHaveAttribute("value", "priority");

    const updatedDataAfterToggle = JSON.parse(
      plotlyChart.getAttribute("data-prop") || "[]"
    );

    const updatedMoodLabelsAfterToggle = updatedDataAfterToggle.filter(
      (d: any) => Array.isArray(d.text) && d.text.every((t: string) => t === "")
    );
    const updatedPriorityLabelsAfterToggle = updatedDataAfterToggle.filter(
      (d: any) => Array.isArray(d.text) && d.text.includes("Delete it")
    );

    expect(
      updatedMoodLabelsAfterToggle.every((d: any) =>
        d.text.every((t: string) => t === "")
      )
    ).toBe(true);
    expect(updatedPriorityLabelsAfterToggle).not.toHaveLength(0);
  });
});
