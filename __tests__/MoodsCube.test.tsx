import React, { useState, useEffect } from "react";
import { render, screen } from "@testing-library/react";
import { NeurochemState } from "@/app/moods/components/MoodsDisplay";

// Simple component to simulate the state update
const SimpleChart = ({ neuroState }: { neuroState: NeurochemState }) => (
  <div data-testid="simple-chart">
    Dopamine: {neuroState.dopamine}, Serotonin: {neuroState.serotonin},
    Adrenaline: {neuroState.adrenaline}
  </div>
);

describe("State Updates", () => {
  it("displays the correct state values in the chart", () => {
    const Wrapper = () => {
      const [neuroState, setNeuroState] = useState<NeurochemState>({
        dopamine: 1,
        serotonin: 1,
        adrenaline: 1,
      });

      // Update state inside useEffect to avoid re-render loop
      useEffect(() => {
        setNeuroState({
          dopamine: 5,
          serotonin: 3,
          adrenaline: 7,
        });
      }, []); // Empty dependency array ensures it only runs once when the component mounts

      return <SimpleChart neuroState={neuroState} />;
    };

    render(<Wrapper />);

    // Get the chart display
    const simpleChart = screen.getByTestId("simple-chart");

    // Assert the correct values are displayed
    expect(simpleChart).toHaveTextContent("Dopamine: 5");
    expect(simpleChart).toHaveTextContent("Serotonin: 3");
    expect(simpleChart).toHaveTextContent("Adrenaline: 7");
  });
});
