import { render, screen, fireEvent } from "@testing-library/react";
import CategoriesBar from "@/app/toolkit/components/CategoriesBar";
import { useDatabase } from "@/context/DatabaseContext";
import { ToolkitProvider } from "@/context/ToolkitContext";

// Mock DatabaseContext
jest.mock("@/context/DatabaseContext", () => ({
  useDatabase: jest.fn(),
}));

// Helper function to render with ToolkitProvider
const renderWithToolkitContext = (
  ui: React.ReactNode,
  { selectedCategories = [] } = {}
) => {
  return render(
    <ToolkitProvider initialSelectedCategories={selectedCategories}>
      {ui}
    </ToolkitProvider>
  );
};

describe("CategoriesBar Component", () => {
  const mockDatabase = {
    getFromDb: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useDatabase as jest.Mock).mockImplementation(() => mockDatabase);
    mockDatabase.getFromDb.mockResolvedValue([
      { id: "1", name: "Category1", timestamp: "2024-01-01" },
      { id: "2", name: "Category2", timestamp: "2024-01-02" },
    ]);
  });

  it("renders without crashing", async () => {
    renderWithToolkitContext(<CategoriesBar />);
    const categoriesBar = screen.getByTestId("categories-bar");
    expect(categoriesBar).toBeInTheDocument();
  });

  it("renders all categories as buttons", async () => {
    renderWithToolkitContext(<CategoriesBar />);

    // Wait for categories to load
    const allButton = await screen.findByRole("button", { name: "All" });
    expect(allButton).toBeInTheDocument();

    const categories1Button = await screen.findByRole("button", {
      name: "Category1",
    });
    const categories2Button = await screen.findByRole("button", {
      name: "Category2",
    });

    expect(categories1Button).toBeInTheDocument();
    expect(categories2Button).toBeInTheDocument();
  });

  it("highlights the 'All' button when clicked", async () => {
    renderWithToolkitContext(<CategoriesBar />);

    const allButton = await screen.findByRole("button", { name: "All" });
    fireEvent.click(allButton);

    expect(allButton).toHaveClass("bg-twd-secondary-purple");
  });

  it("toggles selection for a single category", async () => {
    renderWithToolkitContext(<CategoriesBar />);

    const categories1Button = await screen.findByRole("button", {
      name: "Category1",
    });
    fireEvent.click(categories1Button);

    expect(categories1Button).toHaveClass("bg-twd-secondary-purple");

    fireEvent.click(categories1Button);
    expect(categories1Button).not.toHaveClass("bg-twd-secondary-purple");
  });

  it("clears other selections when 'All' is clicked", async () => {
    renderWithToolkitContext(<CategoriesBar />);

    const categories1Button = await screen.findByRole("button", {
      name: "Category1",
    });
    const allButton = await screen.findByRole("button", { name: "All" });

    fireEvent.click(categories1Button);
    fireEvent.click(allButton);

    expect(categories1Button).not.toHaveClass("bg-twd-secondary-purple");
    expect(allButton).toHaveClass("bg-twd-secondary-purple");
  });

  it("allows selecting multiple categories (except 'All')", async () => {
    renderWithToolkitContext(<CategoriesBar />);

    const categories1Button = await screen.findByRole("button", {
      name: "Category1",
    });
    const categories2Button = await screen.findByRole("button", {
      name: "Category2",
    });

    fireEvent.click(categories1Button);
    fireEvent.click(categories2Button);

    expect(categories1Button).toHaveClass("bg-twd-secondary-purple");
    expect(categories2Button).toHaveClass("bg-twd-secondary-purple");
  });

  it("deselects 'All' when another category is selected", async () => {
    renderWithToolkitContext(<CategoriesBar />);

    const allButton = await screen.findByRole("button", { name: "All" });
    const categories1Button = await screen.findByRole("button", {
      name: "Category1",
    });

    fireEvent.click(allButton);
    fireEvent.click(categories1Button);

    expect(allButton).not.toHaveClass("bg-twd-secondary-purple");
    expect(categories1Button).toHaveClass("bg-twd-secondary-purple");
  });
});
