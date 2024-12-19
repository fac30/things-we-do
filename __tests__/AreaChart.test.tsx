// import { render, screen } from "@testing-library/react";
// import MoodAreaChart from "@/app/insights/components/AreaChart";

// jest.mock("@/ui/shared/PlotlyChart", () => ({
//   __esModule: true,
//   default: ({ data }: { data: any }) => (
//     <div data-testid="plotly-chart" data-prop={JSON.stringify(data)} />
//   ),
// }));

// describe("AreaChart Component", () => {
//   const mockData = [
//     {
//       neurotransmitters: {
//         dopamine: 5,
//         serotonin: 3,
//         adrenaline: 7,
//       },
//       moodName: "Happy",
//       timestamp: "2023-01-01T12:00:00Z",
//       id: "1",
//       createdAt: "2023-01-01T12:00:00Z",
//     },
//     {
//       neurotransmitters: {
//         dopamine: 6,
//         serotonin: 4,
//         adrenaline: 8,
//       },
//       moodName: "Sad",
//       timestamp: "2023-01-02T12:00:00Z",
//       id: "2",
//       createdAt: "2023-01-02T12:00:00Z",
//     }
//   ];

//   const mockStartOfRange = new Date("2023-01-01T00:00:00Z");
//   const mockEndOfRange = new Date("2023-12-31T23:59:59Z");

//   it("renders without crashing", () => {
//     render(
//       <MoodAreaChart
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
//       <MoodAreaChart
//         dataArray={[]}
//         startOfRange={mockStartOfRange}
//         endOfRange={mockEndOfRange}
//         selectedButton="day"
//       />
//     );

//     expect(
//       screen.getByText("No data available for the graph.")
//     ).toBeInTheDocument();
//   });

//   it("correctly calculates percentage distribution", () => {
//     render(
//       <MoodAreaChart
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

//     // Check that we have two traces (one for each mood)
//     expect(plotlyData).toHaveLength(2);

//     // First data point should be 100% for "Happy"
//     const happyTrace = plotlyData.find((d: any) => d.name === "Happy");
//     expect(happyTrace.y[0]).toBe(100); // First point should be 100%
//     expect(happyTrace.y[1]).toBe(50);  // Second point should be 50%

//     // Second mood should start at 0% and go to 50%
//     const sadTrace = plotlyData.find((d: any) => d.name === "Sad");
//     expect(sadTrace.y[0]).toBe(0);    // First point should be 0%
//     expect(sadTrace.y[1]).toBe(50);   // Second point should be 50%
//   });
// });
