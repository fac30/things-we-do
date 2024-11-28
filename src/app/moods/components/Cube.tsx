"use client";

import { useContext } from "react";
import { NeurochemContext } from "../page";
import PlotlyChart from "@/ui/shared/PlotlyChart";
import { Datum } from "plotly.js";

export function Cube() {
  const context = useContext(NeurochemContext);

  if (!context) {
    throw new Error("Cube must be used within a NeurochemContext Provider");
  }

  const { neuroState } = context;

  const renderValue = (value: Datum): string | number =>
    value !== null && value instanceof Date
      ? value.toISOString()
      : value ?? "N/A";

  return (
    <>
      <PlotlyChart
        data={[
          {
            x: [neuroState.dopamine],
            y: [neuroState.serotonin],
            z: [neuroState.adrenaline],
            type: "scatter3d",
            mode: "markers",
            marker: {
              size: 5,
              color: "#893FFC",
              symbol: "circle",
              line: {
                color: "rgb(204, 204, 204)",
                width: 1,
              },
            },
          },
        ]}
        layout={{
          width: 600,
          height: 400,
          title: { text: "Your mood" },
          scene: {
            xaxis: {
              range: [0, 10], // Lock x-axis range
              showticklabels: false, // Hide numbers
              title: "", // Remove axis title
              zeroline: true, // Show center zero line
              gridcolor: "lightgray", // Set gridline color
              nticks: 2, // Two ticks to create one half-line
            },
            yaxis: {
              range: [0, 10], // Lock y-axis range
              showticklabels: false, // Hide numbers
              title: "", // Remove axis title
              zeroline: true, // Show center zero line
              gridcolor: "lightgray", // Set gridline color
              nticks: 2, // Two ticks to create one half-line
            },
            zaxis: {
              range: [0, 10], // Lock z-axis range
              showticklabels: false, // Hide numbers
              title: "", // Remove axis title
              zeroline: true, // Show center zero line
              gridcolor: "lightgray", // Set gridline color
              nticks: 2, // Two ticks to create one half-line
            },
          },
        }}
      />
      <div className="p-4 border rounded">
        <h3 className="text-white">Coordinates:</h3>
        <p className="text-white">
          x (dopamine): {renderValue(neuroState.dopamine)}
        </p>
        <p className="text-white">
          y (serotonin): {renderValue(neuroState.serotonin)}
        </p>
        <p className="text-white">
          z (adrenaline): {renderValue(neuroState.adrenaline)}
        </p>
      </div>
    </>
  );
}
