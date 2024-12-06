import { render, screen, fireEvent } from "@testing-library/react";
import CategoryBar from "@/app/toolkit/components/CategoryBar";

// Mock the `Button` component
jest.mock("@/ui/shared/Button", () => ({
  __esModule: true,
  default: ({
    label,
    onClick,
    className,
    ariaPressed,
  }: {
    label: string;
    onClick: () => void;
    className?: string;
    ariaPressed?: boolean;
  }) => (
    <button
      onClick={onClick}
      className={className}
      aria-pressed={ariaPressed}
      data-testid={`button-${label}`}
    >
      {label}
    </button>
  ),
}));

describe("CategoryBar Component", () => {
  it("renders without crashing", () => {
    render(<CategoryBar />);
    const bar = screen.getByTestId("category-bar");
    expect(bar).toBeInTheDocument();
  });

  it("renders all categories as buttons", () => {
    render(<CategoryBar />);
    const categories = [
      "All",
      "Replace",
      "Distract",
      "Barrier",
      "Change state",
      "Category 5",
      "Category 6",
      "Category 7",
    ];

    categories.forEach((category) => {
      const button = screen.getByTestId(`button-${category}`);
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(category);
    });
  });

  it("highlights the 'All' button when clicked", () => {
    render(<CategoryBar />);

    const allButton = screen.getByTestId("button-All");
    fireEvent.click(allButton);

    expect(allButton).toHaveClass("bg-twd-secondary-purple text-white");
    expect(allButton).toHaveAttribute("aria-pressed", "true");

    // Ensure other buttons are not highlighted
    const otherButton = screen.getByTestId("button-Replace");
    expect(otherButton).not.toHaveClass("bg-twd-secondary-purple");
    expect(otherButton).toHaveAttribute("aria-pressed", "false");
  });

  it("toggles selection for a single category", () => {
    render(<CategoryBar />);

    const replaceButton = screen.getByTestId("button-Replace");

    // Select "Replace"
    fireEvent.click(replaceButton);
    expect(replaceButton).toHaveClass("bg-twd-secondary-purple text-white");
    expect(replaceButton).toHaveAttribute("aria-pressed", "true");

    // Deselect "Replace"
    fireEvent.click(replaceButton);
    expect(replaceButton).not.toHaveClass("bg-twd-secondary-purple");
    expect(replaceButton).toHaveAttribute("aria-pressed", "false");
  });

  it("clears other selections when 'All' is clicked", () => {
    render(<CategoryBar />);

    const allButton = screen.getByTestId("button-All");
    const replaceButton = screen.getByTestId("button-Replace");

    // Select "Replace"
    fireEvent.click(replaceButton);
    expect(replaceButton).toHaveClass("bg-twd-secondary-purple");

    // Click "All"
    fireEvent.click(allButton);
    expect(allButton).toHaveClass("bg-twd-secondary-purple");
    expect(replaceButton).not.toHaveClass("bg-twd-secondary-purple");
  });

  it("allows selecting multiple categories (except 'All')", () => {
    render(<CategoryBar />);

    const replaceButton = screen.getByTestId("button-Replace");
    const distractButton = screen.getByTestId("button-Distract");

    // Select "Replace"
    fireEvent.click(replaceButton);
    expect(replaceButton).toHaveClass("bg-twd-secondary-purple");

    // Select "Distract"
    fireEvent.click(distractButton);
    expect(distractButton).toHaveClass("bg-twd-secondary-purple");
    expect(replaceButton).toHaveClass("bg-twd-secondary-purple");
  });

  it("deselects 'All' when another category is selected", () => {
    render(<CategoryBar />);

    const allButton = screen.getByTestId("button-All");
    const replaceButton = screen.getByTestId("button-Replace");

    // Click "All"
    fireEvent.click(allButton);
    expect(allButton).toHaveClass("bg-twd-secondary-purple");

    // Click "Replace"
    fireEvent.click(replaceButton);
    expect(replaceButton).toHaveClass("bg-twd-secondary-purple");
    expect(allButton).not.toHaveClass("bg-twd-secondary-purple");
  });
});