import PlotlyChart from "@/ui/shared/PlotlyChart";
import { Insight } from "./InsightsDisplay";

interface MoodAreaChartProps {
  dataArray: Insight[];
  startOfRange: Date;
  endOfRange: Date;
  selectedButton: string;
}

export default function MoodAreaChart({
  dataArray,
  startOfRange,
  endOfRange,
  selectedButton,
}: MoodAreaChartProps) {
  if (!dataArray || dataArray.length === 0) {
    return <div>No data available for the graph.</div>;
  }

  const sortedData = [...dataArray].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  // Get unique mood names
  const uniqueMoods = Array.from(
    new Set(sortedData.map((entry) => entry.moodName))
  );

  // Create traces for each mood with cumulative totals
  const traces = uniqueMoods.map((mood) => {
    const moodData = sortedData.filter((entry) => entry.moodName === mood);
    let runningTotal = 0;
    
    const cumulativeData = moodData.map((entry) => {
      runningTotal += 1;
      return {
        x: new Date(entry.timestamp).toISOString(),
        y: runningTotal,
      };
    });

    const dataPoints = [
      ...cumulativeData,
      { x: endOfRange.toISOString(), y: runningTotal }
    ];

    return {
      x: dataPoints.map(point => point.x),
      y: dataPoints.map(point => point.y),
      type: "scatter",
      mode: "none",
      fill: "tonexty",
      name: mood,
      stackgroup: "one",
      groupnorm: "percent",
      line: { shape: "spline" }
    };
  });

  const tickFormat = (() => {
    switch (selectedButton) {
      case "day":
        return "%H:00";
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

  return (
    <div className="bg-twd-graph-background mt-10 w-11/12 m-auto rounded-lg">
      <div className="w-10/12 m-auto pt-5">
        <h2 className="text-xl">Mood Accumulation</h2>
        <p>How have your moods built up over time?</p>
      </div>
      <div className="w-11/12 m-auto flex justify-center text-center mb-10 mt-5">
        <PlotlyChart
          data={traces}
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
              range: [startOfRange.toISOString(), endOfRange.toISOString()],
            },
            yaxis: {
              title: "",
              showgrid: false,
              showticklabels: true,
              titlefont: {
                color: "white",
              },
              tickfont: {
                color: "white",
              },
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
  );
} 