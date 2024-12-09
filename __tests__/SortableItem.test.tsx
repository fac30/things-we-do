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

  it("renders without crashing", () => {
    render(
      <SortableItem
        item={defaultItem}
        handleToggle={mockHandleToggle}
        handleDelete={mockHandleDelete}
      />
    );

    // Check the main container renders
    const container = screen.getByText("Test Item").closest("div");
    expect(container).toBeInTheDocument();
  });

  it("renders the checkbox, name, image, link, and delete button", () => {
    render(
      <SortableItem
        item={defaultItem}
        handleToggle={mockHandleToggle}
        handleDelete={mockHandleDelete}
      />
    );

    // Check for the checkbox
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    // Check for the item name
    const itemName = screen.getByText("Test Item");
    expect(itemName).toBeInTheDocument();

    // Check for the image
    const img = screen.getByRole("img", { name: /test item/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", defaultItem.imageUrl);

    // Check for the link
    const link = screen.getByRole("link", { name: /go to resource/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", defaultItem.infoUrl);

    // Check for the delete button
    const deleteButton = screen.getByText("Delete");
    expect(deleteButton).toBeInTheDocument();
  });

  it("renders 'No Image' when imageUrl is invalid", () => {
    const itemWithInvalidImage = { ...defaultItem, imageUrl: "" };

    render(
      <SortableItem
        item={itemWithInvalidImage}
        handleToggle={mockHandleToggle}
        handleDelete={mockHandleDelete}
      />
    );

    // Check that "No Image" text is rendered
    expect(screen.getByText("No Image")).toBeInTheDocument();
  });

  it("calls handleToggle when the checkbox is clicked", () => {
    render(
      <SortableItem
        item={defaultItem}
        handleToggle={mockHandleToggle}
        handleDelete={mockHandleDelete}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockHandleToggle).toHaveBeenCalledWith(defaultItem.id);
  });

  it("calls handleDelete when the delete button is clicked", () => {
    render(
      <SortableItem
        item={defaultItem}
        handleToggle={mockHandleToggle}
        handleDelete={mockHandleDelete}
      />
    );

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(mockHandleDelete).toHaveBeenCalledWith(defaultItem.id);
  });

  it("applies line-through styling when the item is checked", () => {
    const checkedItem = { ...defaultItem, checked: true };

    render(
      <SortableItem
        item={checkedItem}
        handleToggle={mockHandleToggle}
        handleDelete={mockHandleDelete}
      />
    );

    const itemName = screen.getByText("Test Item");
    expect(itemName).toHaveClass("line-through text-gray-400");
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
      "flex-col",
      "items-start",
      "p-4",
      "rounded-lg",
      "shadow-lg",
      "bg-twd-background"
    );

    // Check sub-layout
    const firstRow = screen.getByText("Test Item").closest("div");
    expect(firstRow).toHaveClass("flex", "items-center", "space-x-3", "w-full");

    const secondRow = screen.getByRole("link", { name: /go to resource/i }).closest("div");
    expect(secondRow).toHaveClass("flex", "items-center", "justify-between", "mt-2", "pl-8", "w-full");
  });
});