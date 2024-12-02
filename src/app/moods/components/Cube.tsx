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
      opacity: 0.5,
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
      opacity: 0.5,
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
      opacity: 0.5,
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
      opacity: 0.5,
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
      opacity: 0.5,
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
      opacity: 0.5,
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
      opacity: 0.5,
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
      opacity: 0.5,
      color: "#FFAA22",
      lighting: {
        diffuse: 0.1,
        specular: 2.0,
        roughness: 0.5,
      },
    },
  ];

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
              size: 12,
              color: "#893FFC",
              symbol: "circle",
              line: {
                color: "rgb(204, 204, 204)",
                width: 1,
              },
            },
          },
          ...cubeMeshes,
        ]}
        layout={{
          paper_bgcolor: "#1B192E",
          hidesources: true,
          width: 200,
          height: 200,
          margin: {
            l: 0,
            r: 0,
            t: 20,
            b: 0,
            pad: 0,
          },
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
              nticks: 2,
            },
            yaxis: {
              range: [0, 10],
              showticklabels: false,
              nticks: 2,
            },
            zaxis: {
              range: [0, 10],
              showticklabels: false,
              nticks: 2,
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
