"use client";

import { useContext } from "react";
import { NeurochemContext } from "../page";
import PlotlyChart from "@/ui/shared/PlotlyChart";

export function Cube() {
  const context = useContext(NeurochemContext);

  if (!context) {
    throw new Error("Cube must be used within a NeurochemContext Provider");
  }

  const { neuroState } = context;

  /*  const renderValue = (value: Datum): string | number =>
    value !== null && value instanceof Date
      ? value.toISOString()
      : value ?? "N/A"; */

  return (
    <div className="flex justify-center">
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
          paper_bgcolor: "#1B192E",
          hidesources: true,
          width: 600,
          height: 400,
          scene: {
            aspectmode: "cube",
            dragmode: false,
            xaxis: {
              range: [0, 10],
              showticklabels: false,
              title: "",
              zeroline: true,
              gridcolor: "lightgray",
              nticks: 2,
              backgroundcolor: "#FFD93D",
              showbackground: true,
            },
            yaxis: {
              range: [0, 10],
              showticklabels: false,
              title: "",
              zeroline: true,
              gridcolor: "lightgray",
              nticks: 2,
              backgroundcolor: "#FF6B6B",
              showbackground: true,
            },
            zaxis: {
              range: [0, 10],
              showticklabels: false,
              title: "",
              zeroline: true,
              gridcolor: "lightgray",
              nticks: 2,
              backgroundcolor: "#6BCB77",
              showbackground: true,
            },
          },
        }}
        config={{
          modeBarButtons: false,
          displaylogo: false,
          staticPlot: true,
        }}
      />
      {/* <div className="p-4 border rounded">
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
      </div> */}
    </div>
  );
}
