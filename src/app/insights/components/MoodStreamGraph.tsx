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

  const sortedData = [...dataArray].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const filteredData = sortedData.filter(entry => {
    const t = new Date(entry.timestamp).getTime();
    return t >= startOfRange.getTime() && t <= endOfRange.getTime();
  });
  
  const uniqueMoods = Array.from(
    new Set(filteredData.map((entry) => entry.moodName))
  );

  const traces = uniqueMoods.map((mood) => {
    const dataPoints = filteredData.reduce((acc, entry) => {
      const timestamp = new Date(entry.timestamp).toISOString();
      
      const entriesUpToNow = filteredData.filter(e => 
        new Date(e.timestamp) <= new Date(entry.timestamp)
      );
      
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
      line: { shape: "spline" },
      fillpattern: {
        shape: ""
      },
      hoveron: "points+fills",
      hoverinfo: "name+y",
      stackpos: 1
    };
  });

  if (traces.length > 0) { // Centre the Graph's anchor point
    const timeSteps = traces[0].x; // all traces share the same x if data is consistent
    for (let i = 0; i < timeSteps.length; i++) {
      
      let totalAtTime = 0;
      for (let t = 0; t < traces.length; t++) {
        totalAtTime += (traces[t].y as number[])[i];
      }
      const midpoint = totalAtTime / 2;
      
      for (let t = 0; t < traces.length; t++) {
        (traces[t].y as number[])[i] = (traces[t].y as number[])[i] - midpoint;
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
              rangemode: "tozero",
              fixedrange: false,
              zeroline: true,
              zerolinecolor: "#262538"
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