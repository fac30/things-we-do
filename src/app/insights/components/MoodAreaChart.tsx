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

  // Create time bins based on selectedButton
  const timeFormat = (() => {
    switch (selectedButton) {
      case "day":
        return (date: Date) => date.getHours();
      case "week":
        return (date: Date) => date.getDay();
      case "month":
        return (date: Date) => date.getDate();
      case "year":
        return (date: Date) => date.getMonth();
      default:
        return (date: Date) => date.getTime();
    }
  })();

  // Create data for each mood
  const traces = uniqueMoods.map((mood) => {
    const moodData = sortedData.filter((entry) => entry.moodName === mood);
    const timestamps = moodData.map((entry) => new Date(entry.timestamp));
    
    // Count occurrences in each time bin
    const counts = new Map();
    timestamps.forEach((time) => {
      const bin = timeFormat(time);
      counts.set(bin, (counts.get(bin) || 0) + 1);
    });

    return {
      x: Array.from(counts.keys()),
      y: Array.from(counts.values()),
      type: "scatter",
      mode: "none",
      fill: "tonexty",
      name: mood,
      stackgroup: "one",
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
        <h2 className="text-xl">Mood Distribution</h2>
        <p>How often did you experience each mood?</p>
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
              range: [startOfRange, endOfRange],
            },
            yaxis: {
              title: "",
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