import { render, screen, fireEvent } from "@testing-library/react";
import SortableItem from "@/app/toolkit/components/SortableItem";

describe("SortableItem Component", () => {
  const defaultItem = {
    id: "1",
    name: "Test Item",
    categories: ["Category1"],
    checked: false,
    description: "A test description",
    infoUrl: "https://example.com",
    imageUrl: "https://via.placeholder.com/150",
  };

  const mockHandleToggle = jest.fn();
  const mockHandleDelete = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("has the correct layout", () => {
    const { container } = render(
      <SortableItem
        item={defaultItem}
        handleToggle={mockHandleToggle}
        handleDelete={mockHandleDelete}
      />
    );

    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass(
      "flex",
      "items-center",
      "p-4",
      "rounded-lg",
      "shadow-lg",
      "bg-[#1d1b30]",
      "border-2",
      "border-[#242139]"
    );

    // Check the main content layout
    const mainContent = screen.getByText("Test Item").closest("div");
    expect(mainContent).toHaveClass(
      "flex",
      "items-center",
      "space-x-3",
      "w-full"
    );

    // Check sub-layout for the first row
    const firstRow = screen.getByText("Test Item").closest("div");
    expect(firstRow).toHaveClass("flex", "items-center", "space-x-3", "w-full");

    // Check sub-layout for the second row
    const secondRow = screen
      .getByRole("button", { name: /go to resource/i })
      .closest("div");
    expect(secondRow).toHaveClass(
      "flex",
      "items-center",
      "justify-between",
      "mt-2",
      "w-full"
    );
  });
});
