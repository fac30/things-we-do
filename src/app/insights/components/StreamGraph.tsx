import PlotlyChart from "@/ui/shared/PlotlyChart";
import { Insight } from "./InsightsDisplay";
import moodColours from "./moodColours.json";

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

  // Sort data by timestamp
  const sortedData = [...dataArray].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  // Filter to the current range
  const filteredData = sortedData.filter((entry) => {
    const t = new Date(entry.timestamp).getTime();
    return t >= startOfRange.getTime() && t <= endOfRange.getTime();
  });

  if (filteredData.length === 0) {
    return <div>No data available in the selected range.</div>;
  }

  const uniqueMoods = Array.from(
    new Set(filteredData.map((entry) => entry.moodName))
  );

  // After filtering data but before creating traces
  const firstMood = filteredData[0].moodName;

  const traces = uniqueMoods.map((mood) => {
    const dataPoints = filteredData.map((entry, index) => {
      const timestamp = new Date(entry.timestamp).toISOString();
      const entriesUpToNow = filteredData.slice(0, index + 1);
      const moodCount = entriesUpToNow.filter(
        (e) => e.moodName === mood
      ).length;

      // For the first timestamp, set initial values
      if (index === 0) {
        // If this is the first mood, give it a height of 1
        // Other moods start at 0
        return {
          x: timestamp,
          y: mood === firstMood ? 1 : 0,
        };
      }

      return { x: timestamp, y: moodCount };
    });

    return {
      x: dataPoints.map((point) => point.x),
      y: dataPoints.map((point) => point.y),
      type: "scatter",
      mode: "none",
      fill: "tonexty",
      name: mood,
      stackgroup: "one",
      fillcolor: moodColours[mood as keyof typeof moodColours] || "#FFFFFF",
      orientation: "v",
      stackgaps: "interpolate",
      line: { shape: "spline" },
      hoveron: "points+fills",
      hoverinfo: "name+y",
    };
  });

  // Apply silhouette offset at each timestamp to center the stack
  if (traces.length > 0) {
    const timeSteps = traces[0].x;
    for (let i = 0; i < timeSteps.length; i++) {
      let totalAtTime = 0;
      for (let t = 0; t < traces.length; t++) {
        totalAtTime += (traces[t].y as number[])[i];
      }
      const midpoint = totalAtTime / 2;

      // For the first timestamp, use a smaller offset to create the 20% band
      const offset = i === 0 ? 0.5 : midpoint; // This will create roughly a 20% band

      for (let t = 0; t < traces.length; t++) {
        (traces[t].y as number[])[i] = (traces[t].y as number[])[i] - offset;
      }
    }
  }

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
        <p>
          Find out how which moods have been most prevalent in this time period
        </p>
      </div>

      <div className="w-11/12 m-auto flex justify-center text-center mb-10 mt-5">
        <PlotlyChart
          data={traces as Plotly.Data[]}
          layout={{
            autosize: true,
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
              autorange: true, // allow full range to show negative values
              zeroline: true,
              zerolinecolor: "#262538",
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
  );
}
