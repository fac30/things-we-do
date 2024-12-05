import { render, screen, fireEvent } from "@testing-library/react";
import LineGraph from "@/app/insights/components/LineGraph";

jest.mock("@/ui/shared/PlotlyChart", () => ({
  __esModule: true,
  default: ({ data }: { data: any }) => (
    <div data-testid="plotly-chart" data-prop={JSON.stringify(data)} />
  ),
}));

describe("LineGraph Component", () => {
  const mockData = [
    {
      neurotransmitters: {
        dopamine: 5,
        serotonin: 3,
        adrenaline: 7,
      },
      moodName: "Happy",
      timestamp: new Date().toISOString(),
      id: "1",
      createdAt: new Date().toISOString(),
    },
  ];

  it("renders without crashing", () => {
    render(<LineGraph dataArray={mockData} />);
    expect(screen.getByText("day")).toBeInTheDocument();
    expect(screen.getByText("week")).toBeInTheDocument();
    expect(screen.getByText("month")).toBeInTheDocument();
    expect(screen.getByText("year")).toBeInTheDocument();
  });

  it("displays a message when no data is available", () => {
    render(<LineGraph dataArray={[]} />);
    expect(
      screen.getByText("No data available for the graph.")
    ).toBeInTheDocument();
  });

  it("correctly sets the x-axis and y-axis data", () => {
    render(<LineGraph dataArray={mockData} />);

    const plotlyChart = screen.getByTestId("plotly-chart");
    const plotlyData = JSON.parse(
      plotlyChart.getAttribute("data-prop") || "[]"
    );

    expect(plotlyData).toHaveLength(3);

    const dopamineTrace = plotlyData.find((d) => d.name === "Urgent");
    const serotoninTrace = plotlyData.find((d) => d.name === "Effortful");
    const adrenalineTrace = plotlyData.find((d) => d.name === "Worthwile");

    expect(dopamineTrace.y).toEqual([5]);
    expect(serotoninTrace.y).toEqual([3]);
    expect(adrenalineTrace.y).toEqual([7]);
  });

  it("updates the graph when the date range is changed", () => {
    render(<LineGraph dataArray={mockData} />);

    fireEvent.click(screen.getByText("week"));
    const plotlyChart = screen.getByTestId("plotly-chart");
    const plotlyData = JSON.parse(
      plotlyChart.getAttribute("data-prop") || "[]"
    );

    expect(plotlyData).toHaveLength(3);
  });

  it("has the ToDate button already clicked on render", () => {
    render(<LineGraph dataArray={mockData} />);

    const toDateButton = screen.getByText("To Date");

    expect(toDateButton).toHaveClass("bg-white text-black");
  });
});
