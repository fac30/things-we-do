import PlotlyChart from "@/ui/shared/PlotlyChart";

export default function LineGraph({ dataArray }) {
  // Example data array
  if (!dataArray || dataArray.length === 0) {
    return <div>No data available for the graph.</div>; // Render a message if no data
  }
  // Sort the data array by timestamp
  const sortedData = [...dataArray].sort(
    (a, b) => new Date(a._data.timestamp) - new Date(b._data.timestamp)
  );

  // Process data for Plotly
  const xAxis = sortedData.map((entry) =>
    new Date(entry._data.timestamp).toISOString()
  ); // Convert timestamp to ISO string
  const dopamineValues = sortedData.map(
    (entry) => entry._data.neurotransmitters.dopamine
  ); // Extract dopamine values

  const serotoninValues = sortedData.map(
    (entry) => entry._data.neurotransmitters.serotonin
  ); // Extract serotonin values

  const adrenalineValues = sortedData.map(
    (entry) => entry._data.neurotransmitters.adrenaline
  ); // Extract serotonin values
  return (
    <div className="w-11/12 m-auto flex justify-center text-center mb-10 mt-10">
      <PlotlyChart
        data={[
          {
            x: xAxis, // Time data
            y: dopamineValues, // Dopamine values
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "green" },
            line: { shape: "spline" }, // Smooth curve
          },
          {
            x: xAxis, // Time data
            y: serotoninValues, // Dopamine values
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
            line: { shape: "spline" }, // Smooth curve
          },
          {
            x: xAxis, // Time data
            y: adrenalineValues, // Dopamine values
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
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
            showgrid: false,
          },
          hidesources: true,
        }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
}
