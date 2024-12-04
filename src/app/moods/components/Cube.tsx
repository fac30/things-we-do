"use client";

import { useContext } from "react";
import { NeurochemContext } from "@/context/NeurochemContext";
import PlotlyChart from "@/ui/shared/PlotlyChart";
import { PlotData } from "plotly.js";
import quadrants from "./data/quadrants.json";

// Cube quadrants order (in quadrants.json):
// Bottom-front-left
// Bottom-front-right
// Bottom-back-left
// Bottom-back-right
// Top-front-left
// Top-front-right
// Top-back-left
// Top-back-right

interface ExtendedMesh3d extends PlotData {
  alphahull?: number;
  flatshading?: boolean;
  color?: string;
  lighting?: {
    diffuse?: number;
    specular?: number;
    roughness?: number;
  };
}

// Add type for the text labels
interface TextLabel extends Partial<PlotData> {
  type: "scatter3d";
  x: number[];
  y: number[];
  z: number[];
  text: string[];
  mode: "text";
  textfont: {
    size: number;
    color: string;
  };
}

export function Cube() {
  const context = useContext(NeurochemContext);

  if (!context) {
    throw new Error("Cube must be used within a NeurochemContext Provider");
  }

  const { neuroState } = context;

  const cubeLabels: TextLabel[] = [
    {
      // Bottom-front-left
      type: "scatter3d",
      x: [0],
      y: [0],
      z: [1],
      text: ["Distress"],
      mode: "text",
      textposition: "middle right",
      textfont: {
        size: 15,
        color: "white",
      },
    },
    {
      // Bottom-front-right
      type: "scatter3d",
      x: [11],
      y: [0],
      z: [1],
      text: ["Relief"],
      mode: "text",
      textposition: "middle left",
      textfont: {
        size: 15,
        color: "white",
      },
    },
    {
      // Bottom-back-left
      type: "scatter3d",
      x: [2.75],
      y: [5.5],
      z: [2.75],
      text: ["Guilt"],
      mode: "text",
      textposition: "middle center",
      textfont: {
        size: 15,
        color: "white",
      },
    },
    {
      // Bottom-back-right
      type: "scatter3d",
      x: [7.75],
      y: [5.5],
      z: [2.75],
      text: ["Content"],
      mode: "text",
      textposition: "middle center",
      textfont: {
        size: 15,
        color: "white",
      },
    },
    {
      // Top-front-left
      type: "scatter3d",
      x: [0],
      y: [0],
      z: [10],
      text: ["Fight/flight"],
      mode: "text",
      textposition: "middle right",
      textfont: {
        size: 15,
        color: "white",
      },
    },
    {
      // Top-front-right
      type: "scatter3d",
      x: [11],
      y: [0],
      z: [10],
      text: ["Interest"],
      mode: "text",
      textposition: "middle left",
      textfont: {
        size: 15,
        color: "white",
      },
    },
    {
      // Top-back-left
      type: "scatter3d",
      x: [2.75],
      y: [5.5],
      z: [7.75],
      text: ["Freeze"],
      mode: "text",
      textposition: "middle center",
      textfont: {
        size: 15,
        color: "white",
      },
    },
    {
      // Top-back-right
      type: "scatter3d",
      x: [7.75],
      y: [5.5],
      z: [7.75],
      text: ["Joy"],
      mode: "text",
      textposition: "middle center",
      textfont: {
        size: 15,
        color: "white",
      },
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative flex justify-center w-full">
        {/* Left side labels */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col justify-between h-[200px]">
          <span className="rotate-[-90deg] origin-center whitespace-nowrap text-white text-sm">
            Urgent
          </span>
          <span className="rotate-[-90deg] origin-center whitespace-nowrap text-white text-sm">
            Not urgent
          </span>
        </div>

        {/* Plotly Chart */}
        <div className="flex justify-center h-[250px] w-[250px]">
          <PlotlyChart
            data={[
              {
                x: [neuroState.dopamine ?? 0],
                y: [10 - (Number(neuroState.serotonin) ?? 0)],
                z: [neuroState.adrenaline ?? 0],
                type: "scatter3d",
                mode: "markers",
                marker: {
                  size: 6,
                  color: "#fff",
                  opacity: 1,
                  symbol: "circle",
                  line: {
                    color: "rgb(204, 204, 204)",
                    width: 1,
                  },
                },
              },
              ...cubeLabels,
              ...(quadrants as Partial<ExtendedMesh3d>[]),
            ]}
            layout={{
              paper_bgcolor: "#1B192E",
              hidesources: true,
              width: 250,
              height: 250,
              hovermode: false,
              clickmode: "none",
              dragmode: false,
              margin: {
                l: 0,
                r: 0,
                t: 5,
                b: 0,
                pad: 0,
              },
              showlegend: false,
              scene: {
                aspectmode: "cube",
                dragmode: false,
                camera: {
                  eye: {
                    x: 0,
                    y: -1.7,
                    z: 0,
                  },
                },
                xaxis: {
                  range: [0, 11],
                  showticklabels: false,
                },
                yaxis: {
                  range: [0, 11],
                  showticklabels: false,
                },
                zaxis: {
                  range: [0, 11],
                  showticklabels: false,
                },
              },
            }}
            config={{ displayModeBar: false }}
          />
        </div>
      </div>

      {/* Bottom labels */}
      <div className="flex justify-between w-[250px] mt-4">
        <span className="text-white text-sm">Not important</span>
        <span className="text-white text-sm">Important</span>
      </div>
    </div>
  );
}
