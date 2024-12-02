import { render, screen } from "@testing-library/react";
import MoodsPage from "@/app/moods/page";
// import { useContext } from "react";
// import { NeurochemContext } from "@/context/NeurochemContext";

// Mock the child components
jest.mock("@/app/moods/components/Cube", () => ({
  Cube: () => <div data-testid="mock-cube">Cube Component</div>,
}));

jest.mock("@/app/moods/components/SliderBox", () => ({
  SliderBox: () => <div data-testid="mock-slider-box">SliderBox Component</div>,
}));

describe("MoodsPage", () => {
  it("renders without crashing", () => {
    render(<MoodsPage />);
  });

  it("renders both Cube and SliderBox components", () => {
    render(<MoodsPage />);

    expect(screen.getByTestId("mock-cube")).toBeInTheDocument();
    expect(screen.getByTestId("mock-slider-box")).toBeInTheDocument();
  });

  //   it("initializes neuroState with correct default values", () => {
  //     render(<MoodsPage />);

  //     // We can test the context value by creating a test component that consumes it
  //     const TestComponent = () => {
  //       const context = useContext(NeurochemContext);
  //       if (!context) return null;

  //       return (
  //         <div>
  //           <span data-testid="dopamine">{context.neuroState.dopamine}</span>
  //           <span data-testid="serotonin">{context.neuroState.serotonin}</span>
  //           <span data-testid="adrenaline">{context.neuroState.adrenaline}</span>
  //         </div>
  //       );
  //     };

  //     render(
  //       <MoodsPage>
  //         <TestComponent />
  //       </MoodsPage>
  //     );

  //     expect(screen.getByTestId("dopamine")).toHaveTextContent("5");
  //     expect(screen.getByTestId("serotonin")).toHaveTextContent("5");
  //     expect(screen.getByTestId("adrenaline")).toHaveTextContent("5");
  //   }
  // );

  it("has correct layout structure", () => {
    const { container } = render(<MoodsPage />);

    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass("flex", "flex-col", "gap-4");
  });
});
