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
            line: { shape: "linear" }, // Smooth curve
            name: "Urgent",
          },
          {
            x: xAxis, // Time data
            y: serotoninValues, // Dopamine values
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
            line: { shape: "linear" }, // Smooth curve
            name: "Effortful",
          },
          {
            x: xAxis, // Time data
            y: adrenalineValues, // Dopamine values
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
            line: { shape: "linear" }, // Smooth curve
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
            b: 10,
            pad: 50,
          },
          paper_bgcolor: "#262538",
          plot_bgcolor: "#262538",
          xaxis: {
            title: "",
            tickformat: "%H:%M:%S", // Display time as HH:MM:SS
            showgrid: false,
            titlefont: {
              color: "white", // Change x-axis label text color
            },
            showticklabels: false,
            tickfont: {
              color: "white", // Change x-axis tick text color
            },
          },
          yaxis: {
            title: "",
            range: [0, 10], // Adjust as needed
            showgrid: false,
            titlefont: {
              color: "white", // Change x-axis label text color
            },
            // showticklabels: false,
            tickfont: {
              color: "white", // Change x-axis tick text color
            },
          },
          legend: {
            font: {
              color: "white", // Change general legend text color
            },
            // traceorder: "normal",
            // itemsizing: "constant",
            // itemclick: "toggleothers",
          },
          hidesources: true,
        }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
}
