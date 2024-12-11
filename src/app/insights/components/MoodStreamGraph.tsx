import PlotlyChart from "@/ui/shared/PlotlyChart";
import { Insight } from "./InsightsDisplay";

interface MoodStreamGraphProps {
  dataArray: Insight[];
  startOfRange: Date;
  endOfRange: Date;
  selectedButton: string;
}

export default function MoodStreamGraph({
  dataArray,
  startOfRange,
  endOfRange,
  selectedButton,
}: MoodStreamGraphProps) {
  if (!dataArray || dataArray.length === 0) {
    return (
      <div>No data available for the graph.</div>
    );
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
      const entriesUpToNow = sortedData.filter(e => 
        new Date(e.timestamp) <= new Date(entry.timestamp)
      );
      
      // Just count the occurrences of this mood
      const moodCount = entriesUpToNow.filter(e => e.moodName === mood).length;
      
      acc.push({
        x: timestamp,
        y: moodCount
      });
      
      return acc;
    }, [] as Array<{x: string, y: number}>);

    return {
      x: dataPoints.map(point => point.x),
      y: dataPoints.map(point => point.y),
      type: "scatter",
      mode: "none",
      fill: "tonexty",
      name: mood,
      stackgroup: "one",
      fillcolor: "auto",
      orientation: "v",
      stackgaps: "interpolate",
      offset: "silhouette",
      line: { shape: "spline" },
      fillpattern: {
        shape: ""
      },
      hoveron: "points+fills",
      hoverinfo: "name+y",
      stackpos: 1
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
        <h2 className="text-xl">Mood Flow</h2>
        <p>How have your moods flowed over time?</p>
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
              autorange: true,
              // Add these properties
              rangemode: "tozero",
              fixedrange: false,
              // This helps center the visualization
              zeroline: true,
              zerolinecolor: "#262538" // Same as plot background
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

/* Chart Guide
  This chart is basically a heavily modified scatter graph.
  - type: "scatter", mode: "none"
    - records the updated total for that mood
    - is hidden, leaving only the line connecting them
  - `fill: tonexty`
    - fills the area below the line with colour
    - read it as "toNextY"
  - stackgroup: "one"
    - stacks areas on top of each other
    - as opposed to stacking each one on the x-axis
  - offset: "silhouette"
    - centers the baseline
    - creates the stream graph effect
  - stackgaps: "interpolate"
    - smooths any gaps in the data
  - line: { shape: "spline" }
    - smooths the lines
  */