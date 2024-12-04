"use client";

import dynamic from "next/dynamic";

const Plot = dynamic(
  () => import("react-plotly.js"), { 
    ssr: false,
    loading: () => <div>Loading...</div>
  }
);

interface PlotlyChartProps {
  data: Plotly.Data[];
  layout: Partial<Plotly.Layout>;
  config: Partial<Plotly.Config>;
}

export default function PlotlyChart({ data, layout, config }: PlotlyChartProps) {
  return (
    <div className="w-full h-full">
      <Plot 
        data={data} 
        layout={layout} 
        config={config}
      />
    </div>
  );
}
