// import { render, screen } from "@testing-library/react";
// import MoodStreamGraph from "@/app/insights/components/StreamGraph";

// jest.mock("@/ui/shared/PlotlyChart", () => ({
//   __esModule: true,
//   default: ({ data }: { data: any }) => (
//     <div data-testid="plotly-chart" data-prop={JSON.stringify(data)} />
//   ),
// }));

// describe("StreamGraph Component", () => {
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
//       <MoodStreamGraph
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
//       <MoodStreamGraph
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

//   it("displays a message when no data is in selected range", () => {
//     const outOfRangeStart = new Date("2024-01-01T00:00:00Z");
//     const outOfRangeEnd = new Date("2024-12-31T23:59:59Z");

//     render(
//       <MoodStreamGraph
//         dataArray={mockData}
//         startOfRange={outOfRangeStart}
//         endOfRange={outOfRangeEnd}
//         selectedButton="day"
//       />
//     );

//     expect(
//       screen.getByText("No data available in the selected range.")
//     ).toBeInTheDocument();
//   });

//   it("correctly sets up stream graph data", () => {
//     render(
//       <MoodStreamGraph
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

//     // First mood should start with height 0.5
//     const firstMoodTrace = plotlyData[0];
//     expect(firstMoodTrace.y[0]).toBe(0.5);

//     // Second mood should start with height -0.5 to balance the graph
//     const secondMoodTrace = plotlyData[1];
//     expect(secondMoodTrace.y[0]).toBe(-0.5);

//     // Values should sum to 0 at any point
//     expect(firstMoodTrace.y[0] + secondMoodTrace.y[0]).toBe(0);
//   });
// });
