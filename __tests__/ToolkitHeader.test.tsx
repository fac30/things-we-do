import { render, screen } from "@testing-library/react";
import Header from "@/app/toolkit/components/ToolkitHeader";

// Mock the child components
jest.mock("@/ui/shared/Image", () => ({
    __esModule: true,
    default: ({ src, alt }: { src: string; alt: string }) => (
      <img src={src} alt={alt} data-testid="mock-image" />
    ),
  }));

jest.mock("@heroicons/react/24/solid", () => ({
  WrenchIcon: () => <svg data-testid="mock-wrench-icon" />,
}));

describe("ToolkitHeader", () => {
  it("renders without crashing", () => {
    render(<Header />);
  });

  it("renders the WrenchIcon and ImageComponent", () => {
    render(<Header />);

    expect(screen.getByTestId("mock-wrench-icon")).toBeInTheDocument();
    expect(screen.getByTestId("mock-image")).toBeInTheDocument();
  });

  it("renders the header title", () => {
    render(<Header />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "My Toolkit"
    );
  });

  it("has correct layout classes", () => {
    const { container } = render(<Header />);

    expect(container.firstChild).toHaveClass(
      "flex",
      "items-center",
      "justify-between",
      "px-6",
      "py-8",
      "shadow-md",
      "sm:px-6",
      "sm:py-3"
    );
  });
});