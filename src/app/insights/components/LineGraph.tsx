import PlotlyChart from "@/ui/shared/PlotlyChart";

export default function LineGraph() {
  return (
    <div className=" w-11/12 m-auto flex justify-center text-center mb-10 mt-10">
      <PlotlyChart
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
          },
        ]}
        layout={{
          width: 350,
          height: 200,
          margin: {
            l: 0,
            r: 0,
            t: 5,
            b: 0,
            pad: 0,
          },
          paper_bgcolor: "#262538",
          plot_bgcolor: "#262538",
          hidesources: true,
        }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
}
