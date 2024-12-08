import PlotlyChart from "@/ui/shared/PlotlyChart";

import { Insight } from "./InsightsDisplay";

interface LineGraphProps {
  dataArray: Insight[];
  startOfRange: Date;
  endOfRange: Date;
}

export default function LineGraph({
  dataArray,
  startOfRange,
  endOfRange,
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

  return (
    <>
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
              marker: { color: "blue", size: 10 },
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
              tickformat: "%H:%M",
              showgrid: false,
              titlefont: {
                color: "white",
              },
              showticklabels: true,
              tickfont: {
                color: "white",
              },
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
                color: "white",
              },
            },
            hidesources: true,
          }}
          config={{ displayModeBar: false }}
        />
      </div>
    </>
  );
}
