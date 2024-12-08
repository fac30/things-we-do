import PlotlyChart from "@/ui/shared/PlotlyChart";

import { Insight } from "./InsightsDisplay";

interface LineGraphProps {
  dataArray: Insight[];
  startOfRange: Date;
  endOfRange: Date;
  selectedButton: string;
}

export default function LineGraph({
  dataArray,
  startOfRange,
  endOfRange,
  selectedButton,
}: LineGraphProps) {
  if (!dataArray || dataArray.length === 0) {
    return <div>No data available for the graph.</div>;
  }

  const sortedData = [...dataArray].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const xAxis = sortedData.map((entry) =>
    new Date(entry.timestamp).toISOString()
  );
  const dopamineValues = sortedData.map(
    (entry) => entry.neurotransmitters.dopamine
  );

  const serotoninValues = sortedData.map(
    (entry) => entry.neurotransmitters.serotonin
  );

  const adrenalineValues = sortedData.map(
    (entry) => entry.neurotransmitters.adrenaline
  );

  const tickFormat = (() => {
    switch (selectedButton) {
      case "day":
        return "%H";
      case "week":
        return "%a";
      case "month":
        return "%d";
      case "year":
        return "%b";
      default:
        return "";
    }
  })();

  const dtick = (() => {
    switch (selectedButton) {
      case "day":
        return 3 * 3600000;
      case "week":
        return 86400000;
      case "month":
        return 3 * 86400000;
      case "year":
        return "M1";
      default:
        return undefined;
    }
  })();

  return (
    <>
      <div className="bg-twd-graph-background mt-10 w-11/12 m-auto rounded-sm">
        <div className="w-10/12 m-auto pt-5">
          <h2 className="text-xl">Decision Maker</h2>
          <p>How did the things I wanted to do feel?</p>
        </div>
        <div className="w-11/12 m-auto flex justify-center text-center mb-10 mt-5">
          <PlotlyChart
            data={[
              {
                x: xAxis,
                y: dopamineValues,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "green" },
                line: { shape: "spline", width: 3 },
                name: "Urgent",
              },
              {
                x: xAxis,
                y: serotoninValues,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "blue" },
                line: { shape: "spline", width: 3 },
                name: "Effortful",
              },
              {
                x: xAxis,
                y: adrenalineValues,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "red" },
                line: { shape: "spline", width: 3 },
                name: "Worthwile",
              },
            ]}
            layout={{
              width: 350,
              height: 350,
              margin: {
                l: 10,
                r: 10,
                t: 5,
                b: 40,
                pad: 10,
              },

              paper_bgcolor: "#262538",
              plot_bgcolor: "#262538",
              xaxis: {
                title: "",
                tickformat: tickFormat,
                showgrid: false,
                titlefont: {
                  color: "white",
                },
                showticklabels: true,
                tickfont: {
                  color: "white",
                },
                dtick: dtick,

                range: [startOfRange.toISOString(), endOfRange.toISOString()],
              },
              yaxis: {
                title: "",
                range: [0, 10],
                showgrid: false,
                showticklabels: false,
                titlefont: {
                  color: "white",
                },

                tickfont: {
                  color: "white",
                },
              },
              legend: {
                font: {
                  size: 10, // Reduce the font size of the legend labels
                  color: "white", // Color of the text in the legend
                },
                itemwidth: 9, // Reduce the allocated space for each legend item
                orientation: "h", // Vertical layout (default is vertical)
                // x: 0.9,
                y: -0.15, // Keep legend aligned at the top
                yanchor: "top", // Align the legend at the top vertically
              },
              hidesources: true,
            }}
            config={{ displayModeBar: false }}
          />
        </div>
      </div>
    </>
  );
}
