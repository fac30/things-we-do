import PlotlyChart from "@/ui/shared/PlotlyChart";
import { start } from "repl";

export default function LineGraph({ dataArray }) {
  if (!dataArray || dataArray.length === 0) {
    return <div>No data available for the graph.</div>;
  }

  const sortedData = [...dataArray].sort(
    (a, b) => new Date(a._data.timestamp) - new Date(b._data.timestamp)
  );

  const xAxis = sortedData.map((entry) =>
    new Date(entry._data.timestamp).toISOString()
  );
  const dopamineValues = sortedData.map(
    (entry) => entry._data.neurotransmitters.dopamine
  );

  const serotoninValues = sortedData.map(
    (entry) => entry._data.neurotransmitters.serotonin
  );

  const adrenalineValues = sortedData.map(
    (entry) => entry._data.neurotransmitters.adrenaline
  );

  const now = new Date();

  const dateParams = {
    day: {
      start: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        6,
        0,
        0,
        0
      ), // 6 AM today
      end: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        24,
        0,
        0,
        0
      ), // Midnight tonight
    },
    week: {
      start: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - now.getDay() + 1
      ), // Monday of this week
      end: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - now.getDay() + 7
      ), // Sunday of this week
    },
    month: {
      start: new Date(now.getFullYear(), now.getMonth(), 1), // First day of this month
      end: new Date(now.getFullYear(), now.getMonth() + 1, 0), // Last day of this month
    },
    year: {
      start: new Date(now.getFullYear(), 0, 1), // First day of this year
      end: new Date(now.getFullYear(), 11, 31), // Last day of this year
    },
  };

  let startOfRange = dateParams.day.start;
  let endOfRange = dateParams.day.end;

  endOfRange = now;

  return (
    <div className="w-11/12 m-auto flex justify-center text-center mb-10 mt-10">
      <PlotlyChart
        data={[
          {
            x: xAxis,
            y: dopamineValues,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "green" },
            line: { shape: "linear" },
            name: "Urgent",
          },
          {
            x: xAxis,
            y: serotoninValues,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
            line: { shape: "linear" },
            name: "Effortful",
          },
          {
            x: xAxis,
            y: adrenalineValues,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
            line: { shape: "linear" },
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
            // b: 100,
            pad: 50,
          },
          paper_bgcolor: "#262538",
          plot_bgcolor: "#262538",
          xaxis: {
            title: "",
            tickformat: "%H:%M:%S",
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
  );
}
