import PlotlyChart from "@/ui/shared/PlotlyChart";

import { Insight } from "./InsightsDisplay";

interface LineGraphProps {
  dataArray: Insight[];
  startOfRange: Date;
  endOfRange: Date;
  selectedButton: string;
}

interface AggregatedData {
  // Averaged Data for Year View
  timestamp: string;
  value: number;
}

export default function LineGraph({
  dataArray,
  startOfRange,
  endOfRange,
  selectedButton,
}: LineGraphProps) {
  const width = screen.width * 0.85;

  if (!dataArray || dataArray.length === 0) {
    return (
      <>
        <div className="w-11/12 m-auto flex justify-center mt-6 bg-twd-graph-background py-24 rounded-lg">
          <p className="w-2/3 text-balance text-center">
            Submit your mood in the Track page to see your data
          </p>
        </div>
      </>
    );
  }
  const aggregateDataByMonth = (
    data: number[],
    timestamps: string[]
  ): AggregatedData[] => {
    const monthlyData: { [key: string]: number[] } = {};

    timestamps.forEach((timestamp, index) => {
      const date = new Date(timestamp);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = [];
      }
      monthlyData[monthKey].push(data[index]);
    });

    return Object.entries(monthlyData).map(([monthKey, values]) => ({
      timestamp: new Date(
        parseInt(monthKey.split("-")[0]),
        parseInt(monthKey.split("-")[1]),
        1
      ).toISOString(),
      value: values.reduce((sum, val) => sum + val, 0) / values.length,
    }));
  };

  const aggregateDataByDay = (
    data: number[],
    timestamps: string[]
  ): AggregatedData[] => {
    const dailyData: { [key: string]: number[] } = {};

    timestamps.forEach((timestamp, index) => {
      const date = new Date(timestamp);
      const dayKey = date.toISOString().split("T")[0];

      if (!dailyData[dayKey]) {
        dailyData[dayKey] = [];
      }
      dailyData[dayKey].push(data[index]);
    });

    return Object.entries(dailyData).map(([dayKey, values]) => ({
      timestamp: dayKey,
      value: values.reduce((sum, val) => sum + val, 0) / values.length,
    }));
  };

  const sortedData = [...dataArray].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const xAxis = sortedData.map((entry) =>
    new Date(entry.timestamp).toISOString()
  );

  const processData = (values: number[]): [string[], number[]] => {
    if (selectedButton === "year") {
      const aggregated = aggregateDataByMonth(values, xAxis);
      return [
        aggregated.map((d) => d.timestamp),
        aggregated.map((d) => d.value),
      ];
    } else if (selectedButton === "week" || selectedButton === "month") {
      const aggregated = aggregateDataByDay(values, xAxis);
      return [
        aggregated.map((d) => d.timestamp),
        aggregated.map((d) => d.value),
      ];
    }
    return [xAxis, values];
  };

  const [dopamineX, dopamineY] = processData(
    sortedData.map((entry) => entry.neurotransmitters.dopamine)
  );
  const [serotoninX, serotoninY] = processData(
    sortedData.map((entry) => entry.neurotransmitters.serotonin)
  );
  const [adrenalineX, adrenalineY] = processData(
    sortedData.map((entry) => entry.neurotransmitters.adrenaline)
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
      <div className="bg-twd-graph-background mt-10 w-11/12 m-auto rounded-lg">
        <div className="w-10/12 m-auto pt-5">
          <h2 className="text-xl">Decision Maker</h2>
          <p>How did the things I wanted to do feel?</p>
        </div>

        <div className="w-11/12 m-auto flex justify-center text-center mb-10 mt-5">
          <PlotlyChart
            data={[
              {
                x: dopamineX,
                y: dopamineY,
                type: "scatter",
                mode: "lines",
                marker: { color: "#893FFC" },
                line: { shape: "linear", width: 3 },
                name: "Urgent",
              },
              {
                x: serotoninX,
                y: serotoninY,
                type: "scatter",
                mode: "lines",
                marker: { color: "#D3A107" },
                line: { shape: "linear", width: 3 },
                name: "Effortful",
              },
              {
                x: adrenalineX,
                y: adrenalineY,
                type: "scatter",
                mode: "lines",
                marker: { color: "#6FDC8C" },
                line: { shape: "linear", width: 3 },
                name: "Worthwhile",
              },
            ]}
            layout={{
              width: width,
              height: width,
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
                titlefont: { color: "white" },
                showticklabels: true,
                tickfont: { color: "white" },
                dtick: dtick,
                fixedrange: true,
                type: "date",
                range: [startOfRange.toISOString(), endOfRange.toISOString()],
              },
              yaxis: {
                title: "",
                range: [1, 10],
                showgrid: false,
                showticklabels: false,
                titlefont: { color: "white" },
                tickfont: { color: "white" },
                fixedrange: true,
              },
              annotations: [
                {
                  x: 0,
                  y: 1,
                  xref: "paper",
                  yref: "y",
                  text: "Not at all",
                  showarrow: false,
                  font: { color: "white", size: 14 },
                  align: "left",
                },
                {
                  x: 0,
                  y: 10,
                  xref: "paper",
                  yref: "y",
                  text: "Very",
                  showarrow: false,
                  font: { color: "white", size: 14 },
                  align: "left",
                },
              ],
              legend: {
                font: {
                  size: 12,
                  color: "white",
                },
                itemwidth: 9,
                orientation: "h",

                y: -0.15,
                yanchor: "top",
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
