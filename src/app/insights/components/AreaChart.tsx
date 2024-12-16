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

  // Sort all the mood records by their timestamp
  const sortedData = [...dataArray].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  // Create an array of the mood names that exist in sortedData
  const uniqueMoods = Array.from(
    new Set(sortedData.map((entry) => entry.moodName))
  );

  const traces = uniqueMoods.map((mood) => {
    const dataPoints = sortedData.reduce((acc, entry) => {
      const timestamp = new Date(entry.timestamp).toISOString();

      // Get all entries up to this timestamp
      const entriesUpToNow = sortedData.filter(
        (e) => new Date(e.timestamp) <= new Date(entry.timestamp)
      );

      // Count total entries and entries for this mood
      const totalCount = entriesUpToNow.length;
      const moodCount = entriesUpToNow.filter(
        (e) => e.moodName === mood
      ).length;

      // Calculate percentage
      const percentage = (moodCount / totalCount) * 100;

      acc.push({
        x: timestamp,
        y: percentage,
      });

      return acc;
    }, [] as Array<{ x: string; y: number }>);

    return {
      x: dataPoints.map((point) => point.x),
      y: dataPoints.map((point) => point.y),
      type: "scatter",
      mode: "none",
      fill: "tonexty",
      name: mood,
      stackgroup: "one",
      line: { shape: "spline" },
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
    <>
      <div className="bg-twd-graph-background mt-10 w-11/12 m-auto rounded-lg">
        <div className="w-10/12 m-auto pt-5">
          <h2 className="text-xl">Mood Accumulation</h2>
          <p>See how prevalent each mood has been at different times.</p>
        </div>

        <div className="w-11/12 m-auto flex justify-center text-center mb-10 mt-5">
          <PlotlyChart
            data={traces as Plotly.Data[]}
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
                fixedrange: true,
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
                fixedrange: true,
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
