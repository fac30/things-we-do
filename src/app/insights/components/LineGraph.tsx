import PlotlyChart from "@/ui/shared/PlotlyChart";

import { Insight } from "./InsightsDisplay";

interface LineGraphProps {
  dataArray: Insight[];
  startOfRange: Date;
  endOfRange: Date;
  selectedButton: string;
}

interface AggregatedData { // Averaged Data for Year View
  timestamp: string;
  value: number;
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

  const aggregateDataByMonth = (data: number[], timestamps: string[]): AggregatedData[] => {
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
        parseInt(monthKey.split('-')[0]),
        parseInt(monthKey.split('-')[1]),
        1
      ).toISOString(),
      value: values.reduce((sum, val) => sum + val, 0) / values.length
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
      return [aggregated.map(d => d.timestamp), aggregated.map(d => d.value)];
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

  const yMax = Math.max(
    ...dopamineY,
    ...serotoninY,
    ...adrenalineY
  );
  const yMin = Math.min(
    ...dopamineY,
    ...serotoninY,
    ...adrenalineY
  );

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
                marker: { color: "green" },
                line: { shape: "spline", width: 3 },
                name: "Urgent",
              },
              {
                x: serotoninX,
                y: serotoninY,
                type: "scatter",
                mode: "lines",
                marker: { color: "blue" },
                line: { shape: "spline", width: 3 },
                name: "Effortful",
              },
              {
                x: adrenalineX,
                y: adrenalineY,
                type: "scatter",
                mode: "lines",
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
                titlefont: { color: "white" },
                showticklabels: true,
                tickfont: { color: "white" },
                dtick: dtick,

                range: [startOfRange.toISOString(), endOfRange.toISOString()],
              },
              yaxis: {
                title: "",
                range: [Math.max(0, yMin - 0.5), yMax + 0.5],
                showgrid: false,
                showticklabels: false,
                titlefont: { color: "white" },
                tickfont: { color: "white" },
              },
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
