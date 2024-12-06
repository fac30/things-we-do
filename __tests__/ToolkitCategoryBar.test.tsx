import { render, screen, fireEvent } from "@testing-library/react";
import CategoryBar from "@/app/toolkit/components/CategoryBar";
import DatabaseManager from "@/lib/db/DatabaseManager";
import { ToolkitProvider } from "@/context/ToolkitContext";

// Mock DatabaseManager
jest.mock("@/lib/db/DatabaseManager", () => ({
  getFromDb: jest.fn(),
}));

// Helper function to render with ToolkitProvider
const renderWithToolkitContext = (ui: React.ReactNode, { selectedCategories = [] } = {}) => {
  return render(
    <ToolkitProvider initialSelectedCategories={selectedCategories}>
      {ui}
    </ToolkitProvider>
  );
};

describe("CategoryBar Component", () => {
  beforeEach(() => {
    (DatabaseManager.getFromDb as jest.Mock).mockResolvedValue([
      { id: "1", name: "Category1", timestamp: "2024-01-01" },
      { id: "2", name: "Category2", timestamp: "2024-01-02" },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", async () => {
    renderWithToolkitContext(<CategoryBar />);
    const categoryBar = screen.getByTestId("category-bar");
    expect(categoryBar).toBeInTheDocument();
  });

  it("renders all categories as buttons", async () => {
    renderWithToolkitContext(<CategoryBar />);
    
    // Wait for categories to load
    const allButton = await screen.findByRole("button", { name: "All" });
    expect(allButton).toBeInTheDocument();
    
    const category1Button = await screen.findByRole("button", { name: "Category1" });
    const category2Button = await screen.findByRole("button", { name: "Category2" });
    
    expect(category1Button).toBeInTheDocument();
    expect(category2Button).toBeInTheDocument();
  });

  it("highlights the 'All' button when clicked", async () => {
    renderWithToolkitContext(<CategoryBar />);
    
    const allButton = await screen.findByRole("button", { name: "All" });
    fireEvent.click(allButton);
    
    expect(allButton).toHaveClass("bg-twd-secondary-purple");
  });

  it("toggles selection for a single category", async () => {
    renderWithToolkitContext(<CategoryBar />);
    
    const category1Button = await screen.findByRole("button", { name: "Category1" });
    fireEvent.click(category1Button);
    
    expect(category1Button).toHaveClass("bg-twd-secondary-purple");
    
    fireEvent.click(category1Button);
    expect(category1Button).not.toHaveClass("bg-twd-secondary-purple");
  });

  it("clears other selections when 'All' is clicked", async () => {
    renderWithToolkitContext(<CategoryBar />);
    
    const category1Button = await screen.findByRole("button", { name: "Category1" });
    const allButton = await screen.findByRole("button", { name: "All" });
    
    fireEvent.click(category1Button);
    fireEvent.click(allButton);
    
    expect(category1Button).not.toHaveClass("bg-twd-secondary-purple");
    expect(allButton).toHaveClass("bg-twd-secondary-purple");
  });

  it("allows selecting multiple categories (except 'All')", async () => {
    renderWithToolkitContext(<CategoryBar />);
    
    const category1Button = await screen.findByRole("button", { name: "Category1" });
    const category2Button = await screen.findByRole("button", { name: "Category2" });
    
    fireEvent.click(category1Button);
    fireEvent.click(category2Button);
    
    expect(category1Button).toHaveClass("bg-twd-secondary-purple");
    expect(category2Button).toHaveClass("bg-twd-secondary-purple");
  });

  it("deselects 'All' when another category is selected", async () => {
    renderWithToolkitContext(<CategoryBar />);
    
    const allButton = await screen.findByRole("button", { name: "All" });
    const category1Button = await screen.findByRole("button", { name: "Category1" });
    
    fireEvent.click(allButton);
    fireEvent.click(category1Button);
    
    expect(allButton).not.toHaveClass("bg-twd-secondary-purple");
    expect(category1Button).toHaveClass("bg-twd-secondary-purple");
  });
});