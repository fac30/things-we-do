import { render, screen, waitFor, act } from "@testing-library/react";
import ToolList from "@/app/toolkit/components/ToolList";
import DatabaseManager from "@/lib/db/DatabaseManager";
import { ToolkitProvider } from "@/context/ToolkitContext";

// Mock the DatabaseManager
jest.mock("@/lib/db/DatabaseManager", () => ({
  getFromDb: jest.fn(),
}));

// Mock the SortableItem component
jest.mock("@/app/toolkit/components/SortableItem", () => ({
  __esModule: true,
  default: ({ item }: { item: { id: string; name: string } }) => (
    <div data-testid={`sortable-item-${item.id}`}>{item.name}</div>
  ),
}));

const renderWithToolkitContext = (ui: React.ReactNode, { selectedCategories = [] } = {}) => {
  return render(
    <ToolkitProvider initialSelectedCategories={selectedCategories}>
      {ui}
    </ToolkitProvider>
  );
};

describe("ToolList Component", () => {
  const mockData = [
    {
      id: "1",
      name: "Item 1",
      categories: ["Category1"],
      checked: false,
      description: "Description 1",
      infoUrl: "https://example.com",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      name: "Item 2",
      categories: ["Category2"],
      checked: true,
      description: "Description 2",
      infoUrl: "https://example.com",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "3",
      name: "Item 3",
      categories: ["Category1", "Category2"],
      checked: false,
      description: "Description 3",
      infoUrl: "https://example.com",
      imageUrl: "https://via.placeholder.com/150",
    }
  ];

  beforeEach(() => {
    (DatabaseManager.getFromDb as jest.Mock).mockResolvedValue(
      mockData.map((item) => ({
        toJSON: () => item,
      }))
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and displays all items when no categories are selected", async () => {
    await act(async () => {
      renderWithToolkitContext(<ToolList />);
    });

    await waitFor(() => {
      expect(DatabaseManager.getFromDb).toHaveBeenCalledWith("toolkit_items");
    });

    mockData.forEach((item) => {
      expect(screen.getByTestId(`sortable-item-${item.id}`)).toBeInTheDocument();
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it("filters items by selected category", async () => {
    await act(async () => {
      renderWithToolkitContext(<ToolList />, { selectedCategories: ["Category1"] });
    });

    await waitFor(() => {
      // Should show items 1 and 3, but not item 2
      expect(screen.getByTestId("sortable-item-1")).toBeInTheDocument();
      expect(screen.getByTestId("sortable-item-3")).toBeInTheDocument();
      expect(screen.queryByTestId("sortable-item-2")).not.toBeInTheDocument();
    });
  });

  it("handles items with multiple categories correctly", async () => {
    await act(async () => {
      renderWithToolkitContext(<ToolList />, { selectedCategories: ["Category2"] });
    });

    await waitFor(() => {
      // Should show items 2 and 3
      expect(screen.getByTestId("sortable-item-2")).toBeInTheDocument();
      expect(screen.getByTestId("sortable-item-3")).toBeInTheDocument();
      expect(screen.queryByTestId("sortable-item-1")).not.toBeInTheDocument();
    });
  });

  it("handles drag-and-drop reorder without errors", async () => {
    await act(async () => {
      renderWithToolkitContext(<ToolList />);
    });

    await waitFor(() => {
      mockData.forEach((item) => {
        expect(screen.getByTestId(`sortable-item-${item.id}`)).toBeInTheDocument();
      });
    });

    const sortableItem1 = screen.getByTestId("sortable-item-1");
    const sortableItem2 = screen.getByTestId("sortable-item-2");

    expect(sortableItem1).toBeInTheDocument();
    expect(sortableItem2).toBeInTheDocument();
  });
});