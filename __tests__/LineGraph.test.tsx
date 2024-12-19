// import { render, screen } from "@testing-library/react";
// import LineGraph from "@/app/insights/components/LineGraph";

// jest.mock("@/ui/shared/PlotlyChart", () => ({
//   __esModule: true,
//   default: ({ data }: { data: unknown }) => (
//     <div data-testid="plotly-chart" data-prop={JSON.stringify(data)} />
//   ),
// }));

// describe("LineGraph Component", () => {
//   const mockData = [
//     {
//       neurotransmitters: {
//         dopamine: 5,
//         serotonin: 3,
//         adrenaline: 7,
//       },
//       moodName: "Happy",
//       timestamp: new Date().toISOString(),
//       id: "1",
//       createdAt: new Date().toISOString(),
//     },
//   ];

//   const mockStartOfRange = new Date("2023-01-01T00:00:00Z");
//   const mockEndOfRange = new Date("2023-12-31T23:59:59Z");

//   it("renders without crashing", () => {
//     render(
//       <LineGraph
//         dataArray={mockData}
//         startOfRange={mockStartOfRange}
//         endOfRange={mockEndOfRange}
//         selectedButton="day"
//       />
//     );

//     const plotlyChart = screen.getByTestId("plotly-chart");
//     expect(plotlyChart).toBeInTheDocument();
//   });

//   it("displays a message when no data is available", () => {
//     render(
//       <LineGraph
//         dataArray={[]}
//         startOfRange={mockStartOfRange}
//         endOfRange={mockEndOfRange}
//         selectedButton=""
//       />
//     );

//     expect(
//       screen.getByText("No data available for the graph.")
//     ).toBeInTheDocument();
//   });

//   it("correctly sets the x-axis and y-axis data", () => {
//     render(
//       <LineGraph
//         dataArray={mockData}
//         startOfRange={mockStartOfRange}
//         endOfRange={mockEndOfRange}
//         selectedButton="day"
//       />
//     );

//     const plotlyChart = screen.getByTestId("plotly-chart");
//     const plotlyData = JSON.parse(
//       plotlyChart.getAttribute("data-prop") || "[]"
//     );

//     expect(plotlyData).toHaveLength(3);

//     const dopamineTrace = plotlyData.find(
//       (d: { name: string }) => d.name === "Urgent"
//     );
//     const serotoninTrace = plotlyData.find(
//       (d: { name: string }) => d.name === "Effortful"
//     );
//     const adrenalineTrace = plotlyData.find(
//       (d: { name: string }) => d.name === "Worthwhile"
//     );

//     expect(dopamineTrace.y).toEqual([5]);
//     expect(serotoninTrace.y).toEqual([3]);
//     expect(adrenalineTrace.y).toEqual([7]);
//   });
// });
