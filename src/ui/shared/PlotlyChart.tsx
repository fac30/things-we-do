"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

interface PlotlyChartProps {
  data: Plotly.Data[];
  layout: Partial<Plotly.Layout>;
  config: Partial<Plotly.Config>;
  onLoaded?: () => void;
}

export default function PlotlyChart({
  data,
  layout,
  config,
  onLoaded,
}: PlotlyChartProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded && onLoaded) {
      onLoaded();
    }
  }, [isLoaded, onLoaded]);

  return (
    <div className="w-full h-full">
      <Plot
        data={data}
        layout={layout}
        config={config}
        onInitialized={() => setIsLoaded(true)}
      />
    </div>
  );
}
