"use client";

import { useContext } from "react";
import { NeurochemContext } from "@/context/NeurochemContext";
import PlotlyChart from "@/ui/shared/PlotlyChart";
import { PlotData } from "plotly.js";

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

  const cubeMeshes: Partial<ExtendedMesh3d>[] = [
    {
      // Bottom-front-left
      type: "mesh3d",
      x: [0, 5, 5, 0, 0, 5, 5, 0],
      y: [0, 0, 5, 5, 0, 0, 5, 5],
      z: [0, 0, 0, 0, 5, 5, 5, 5],
      alphahull: 1,
      flatshading: true,
      opacity: 0.3,
      color: "#4488EE",
      lighting: {
        diffuse: 0.1,
        specular: 2.0,
        roughness: 0.5,
      },
    },
    {
      // Bottom-front-right
      type: "mesh3d",
      x: [5, 10, 10, 5, 5, 10, 10, 5],
      y: [0, 0, 5, 5, 0, 0, 5, 5],
      z: [0, 0, 0, 0, 5, 5, 5, 5],
      alphahull: 1,
      flatshading: true,
      opacity: 0.3,
      color: "#99CC11",
      lighting: {
        diffuse: 0.1,
        specular: 2.0,
        roughness: 0.5,
      },
    },
    {
      // Bottom-back-left
      type: "mesh3d",
      x: [0, 5, 5, 0, 0, 5, 5, 0],
      y: [5, 5, 10, 10, 5, 5, 10, 10],
      z: [0, 0, 0, 0, 5, 5, 5, 5],
      alphahull: 1,
      flatshading: true,
      opacity: 0.3,
      color: "#4488EE",
      lighting: {
        diffuse: 0.1,
        specular: 2.0,
        roughness: 0.5,
      },
    },
    {
      // Bottom-back-right
      type: "mesh3d",
      x: [5, 10, 10, 5, 5, 10, 10, 5],
      y: [5, 5, 10, 10, 5, 5, 10, 10],
      z: [0, 0, 0, 0, 5, 5, 5, 5],
      alphahull: 1,
      flatshading: true,
      opacity: 0.3,
      color: "#99CC11",
      lighting: {
        diffuse: 0.1,
        specular: 2.0,
        roughness: 0.5,
      },
    },
    {
      // Top-front-left
      type: "mesh3d",
      x: [0, 5, 5, 0, 0, 5, 5, 0],
      y: [0, 0, 5, 5, 0, 0, 5, 5],
      z: [5, 5, 5, 5, 10, 10, 10, 10],
      alphahull: 1,
      flatshading: true,
      opacity: 0.3,
      color: "#CC1111",
      lighting: {
        diffuse: 0.1,
        specular: 2.0,
        roughness: 0.5,
      },
    },
    {
      // Top-front-right
      type: "mesh3d",
      x: [5, 10, 10, 5, 5, 10, 10, 5],
      y: [0, 0, 5, 5, 0, 0, 5, 5],
      z: [5, 5, 5, 5, 10, 10, 10, 10],
      alphahull: 1,
      flatshading: true,
      opacity: 0.3,
      color: "#FFAA22",
      lighting: {
        diffuse: 0.1,
        specular: 2.0,
        roughness: 0.5,
      },
    },
    {
      // Top-back-left
      type: "mesh3d",
      x: [0, 5, 5, 0, 0, 5, 5, 0],
      y: [5, 5, 10, 10, 5, 5, 10, 10],
      z: [5, 5, 5, 5, 10, 10, 10, 10],
      alphahull: 1,
      flatshading: true,
      opacity: 0.3,
      color: "#CC1111",
      lighting: {
        diffuse: 0.1,
        specular: 2.0,
        roughness: 0.5,
      },
    },
    {
      // Top-back-right
      type: "mesh3d",
      x: [5, 10, 10, 5, 5, 10, 10, 5],
      y: [5, 5, 10, 10, 5, 5, 10, 10],
      z: [5, 5, 5, 5, 10, 10, 10, 10],
      alphahull: 1,
      flatshading: true,
      opacity: 0.3,
      color: "#FFAA22",
      lighting: {
        diffuse: 0.1,
        specular: 2.0,
        roughness: 0.5,
      },
    },
  ];

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
      x: [10],
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
      x: [2.5],
      y: [5],
      z: [2.5],
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
      x: [7.5],
      y: [5],
      z: [2.5],
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
      z: [9],
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
      x: [10],
      y: [0],
      z: [9],
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
      x: [2.5],
      y: [5],
      z: [7.5],
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
      x: [7.5],
      y: [5],
      z: [7.5],
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
    <div className="flex justify-center">
      <PlotlyChart
        data={[
          {
            x: [neuroState.dopamine ?? 0],
            y: [10 - (Number(neuroState.serotonin) ?? 0)],
            z: [neuroState.adrenaline ?? 0],
            type: "scatter3d",
            mode: "markers",
            marker: {
              size: 12,
              color: "#000000",
              opacity: 1,
              symbol: "circle",
              line: {
                color: "rgb(204, 204, 204)",
                width: 1,
              },
            },
          },
          ...cubeLabels,
          ...cubeMeshes,
        ]}
        layout={{
          paper_bgcolor: "#1B192E",
          hidesources: true,
          width: 250,
          height: 250,
          margin: {
            l: 0,
            r: 0,
            t: 20,
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
              range: [0, 10],
              showticklabels: false,
            },
            yaxis: {
              range: [0, 10],
              showticklabels: false,
            },
            zaxis: {
              range: [0, 10],
              showticklabels: false,
            },
          },
        }}
        config={{
          modeBarButtons: false,
          displaylogo: false,
          staticPlot: true,
        }}
      />
    </div>
  );
}
