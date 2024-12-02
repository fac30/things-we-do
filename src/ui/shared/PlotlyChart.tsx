"use client";

import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface PlotlyChartProps {
  data: Plotly.Data[];
  layout: Partial<Plotly.Layout>;
  config: Partial<Plotly.Config>;
}

export default function PlotlyChart({ data, layout }: PlotlyChartProps) {
  return <Plot data={data} layout={layout} />;
}
