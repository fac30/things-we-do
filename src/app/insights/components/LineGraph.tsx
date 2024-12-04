import PlotlyChart from "@/ui/shared/PlotlyChart";

export default function LineGraph({ dataArray }) {
  // Example data array
  if (!dataArray || dataArray.length === 0) {
    return <div>No data available for the graph.</div>; // Render a message if no data
  }
  const data = [
    {
      timestamp: "2024-12-04T10:50:02.043Z",
      neurotransmitters: {
        adrenaline: 6,
        dopamine: 5,
        serotonin: 4,
      },
    },
    {
      timestamp: "2024-12-04T12:30:45.123Z",
      neurotransmitters: {
        adrenaline: 7,
        dopamine: 8,
        serotonin: 6,
      },
    },
    {
      timestamp: "2024-12-04T14:15:10.567Z",
      neurotransmitters: {
        adrenaline: 5,
        dopamine: 6,
        serotonin: 5,
      },
    },
  ];

  // Process data for Plotly
  const xAxis = dataArray.map((entry) =>
    new Date(entry._data.timestamp).toISOString()
  ); // Convert timestamp to ISO string
  const yAxis = dataArray.map(
    (entry) => entry._data.neurotransmitters.dopamine
  ); // Extract dopamine values

  return (
    <div className="w-11/12 m-auto flex justify-center text-center mb-10 mt-10">
      <PlotlyChart
        data={[
          {
            x: xAxis, // Time data
            y: yAxis, // Dopamine values
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
            line: { shape: "spline" }, // Smooth curve
          },
        ]}
        layout={{
          width: 350,
          height: 200,
          margin: {
            l: 15,
            r: 10,
            t: 5,
            b: 20,
            pad: 0,
          },
          paper_bgcolor: "#262538",
          plot_bgcolor: "#262538",
          xaxis: {
            title: "Time (24-hour format)",
            tickformat: "%H:%M:%S", // Display time as HH:MM:SS
            showgrid: false,
          },
          yaxis: {
            title: "Dopamine Levels",
            range: [0, 10], // Adjust as needed
            showgrid: true,
          },
          hidesources: true,
        }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
}
