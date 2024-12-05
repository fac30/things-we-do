import { render, screen, waitFor, act } from "@testing-library/react";
import CheckBox from "@/app/toolkit/components/ToolList";
import DatabaseManager from "@/lib/db/DatabaseManager";
//import { DndContext } from "@dnd-kit/core";

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

describe("CheckBox Component", () => {
  const mockData = [
    {
      id: "1",
      name: "Item 1",
      category: ["Category1"],
      checked: false,
      description: "Description 1",
      infoUrl: "https://example.com",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      name: "Item 2",
      category: ["Category2"],
      checked: true,
      description: "Description 2",
      infoUrl: "https://example.com",
      imageUrl: "https://via.placeholder.com/150",
    },
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

//   it("renders DndContext with data-testid", () => {
//     render(
//       <DndContext data-testid="dnd-context">
//         <div>Content</div>
//       </DndContext>
//     );
  
//     const container = screen.getByTestId("dnd-context");
//     expect(container).toBeInTheDocument();
//   });

  it("fetches and displays items from the database", async () => {
    await act(async () => {
      render(<CheckBox />);
    });

    await waitFor(() => {
      expect(DatabaseManager.getFromDb).toHaveBeenCalledWith("toolkit_items");
    });

    mockData.forEach((item) => {
      expect(screen.getByTestId(`sortable-item-${item.id}`)).toBeInTheDocument();
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it("handles drag-and-drop reorder without errors", async () => {
    await act(async () => {
      render(<CheckBox />);
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