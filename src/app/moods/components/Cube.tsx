"use client";

import { useMemo, useState } from "react";
import { PlotData } from "plotly.js";
import { NeurochemState } from "./MoodsDisplay";
import Modal from "@/ui/shared/Modal";
import Toggle from "@/ui/shared/Toggle";
import PlotlyChart from "@/ui/shared/PlotlyChart";
import quadrants from "./data/quadrants.json";
import labelsMood from "./data/labels_mood.json";
import labelsPriority from "./data/labels_priority.json";
import moodTooltips from "./data/mood_tooltips.json";
import clsx from "clsx";

// Cube quadrants and labels order (in quadrants.json/labels.json):
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

interface CubeProps {
  neuroState: NeurochemState;
}

export default function Cube({ neuroState }: CubeProps) {
  const [isPriorityMatrix, setIsPriorityMatrix] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [tooltip, setTooltip] = useState("");

  const labels = useMemo(() => {
    return [
      ...labelsMood.map((label) => ({
        ...label,
        text:
          hasRendered && isPriorityMatrix
            ? label.text.map(() => "")
            : label.text,
      })),
      ...labelsPriority.map((label) => ({
        ...label,
        text:
          hasRendered && !isPriorityMatrix
            ? label.text.map(() => "")
            : label.text,
      })),
    ];
  }, [isPriorityMatrix, hasRendered]);

  function handleTooltip(mood: string) {
    setTooltip(moodTooltips[mood as keyof typeof moodTooltips]);
    setModalOpen(true);
  }

  return (
    <>
      <Toggle
        isToggled={isPriorityMatrix}
        setIsToggled={setIsPriorityMatrix}
        toggledOff={"Mood"}
        toggledOn={"Priority"}
        showLabels={true}
      />

      <button
        className={clsx(
          "",
          isPriorityMatrix
            ? "hidden"
            : "absolute left-1/2 top-[122px] transform -translate-x-28 z-20 w-20 h-6"
        )}
        onClick={() => handleTooltip("fight/flight")}
      ></button>
      <button
        className={clsx(
          "",
          isPriorityMatrix
            ? "hidden"
            : "absolute left-1/2 top-[122px] transform translate-x-14 z-20 w-14 h-6"
        )}
        onClick={() => handleTooltip("interest")}
      ></button>
      <button
        className={clsx(
          "",
          isPriorityMatrix
            ? "hidden"
            : "absolute left-1/2 top-[327px] transform -translate-x-28 z-20 w-16 h-6"
        )}
        onClick={() => handleTooltip("distress")}
      ></button>
      <button
        className={clsx(
          "",
          isPriorityMatrix
            ? "hidden"
            : "absolute left-1/2 top-[327px] transform translate-x-16 z-20 w-12 h-6"
        )}
        onClick={() => handleTooltip("relief")}
      ></button>

      <button
        className={clsx(
          "",
          isPriorityMatrix
            ? "hidden"
            : "absolute left-1/2 top-[180px] transform -translate-x-20 z-20 w-16 h-6"
        )}
        onClick={() => handleTooltip("freeze")}
      ></button>
      <button
        className={clsx(
          "",
          isPriorityMatrix
            ? "hidden"
            : "absolute left-1/2 top-[180px] transform translate-x-6 z-20 w-10 h-6"
        )}
        onClick={() => handleTooltip("joy")}
      ></button>
      <button
        className={clsx(
          "",
          isPriorityMatrix
            ? "hidden"
            : "absolute left-1/2 top-[267px] transform -translate-x-16 z-20 w-10 h-6"
        )}
        onClick={() => handleTooltip("guilt")}
      ></button>
      <button
        className={clsx(
          "",
          isPriorityMatrix
            ? "hidden"
            : "absolute left-1/2 top-[267px] transform translate-x-3 z-20 w-16 h-6"
        )}
        onClick={() => handleTooltip("content")}
      ></button>

      <div className="flex flex-col items-center justify-center w-full">
        <div className="relative flex justify-center w-full">
          {/* Left side labels */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-48 -translate-y-1/2 flex flex-col justify-between h-[200px]">
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
                  x: [neuroState.adrenaline ?? 0],
                  y: [10 - (Number(neuroState.serotonin) ?? 0)],
                  z: [neuroState.dopamine ?? 0],
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
                ...(labels as TextLabel[]),
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
              onLoaded={() => setHasRendered(true)}
            />
          </div>
        </div>

        {/* Bottom labels */}
        <div className="flex justify-between w-[250px] mt-4">
          <span className="text-white text-sm">Not important</span>
          <span className="text-white text-sm">Important</span>
        </div>
      </div>
      <Modal
        modalOpen={modalOpen}
        title={tooltip}
        forwardButton={{
          label: "Close",
          action: () => setModalOpen(false),
        }}
      />
    </>
  );
}
