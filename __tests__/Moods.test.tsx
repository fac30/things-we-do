import { render, screen } from "@testing-library/react";
import MoodsPage from "@/app/moods/page";

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

  it("has correct layout structure", () => {
    const { container } = render(<MoodsPage />);

    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass("flex", "flex-col", "gap-4");
  });
});
