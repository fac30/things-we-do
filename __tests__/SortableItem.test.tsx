import { render, screen } from "@testing-library/react";
import SortableItem from "@/app/toolkit/components/SortableItem";

// Mock the `@dnd-kit/sortable` module
jest.mock("@dnd-kit/sortable", () => ({
  useSortable: jest.fn().mockReturnValue({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
    transition: null,
  }),
}));

// Mock the `Button` component
jest.mock("@/ui/shared/Button", () => ({
  __esModule: true,
  default: ({ label }: { label: string }) => (
    <button data-testid="mock-button">{label}</button>
  ),
}));

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

  it("renders without crashing", () => {
    render(
      <SortableItem
        item={defaultItem}
        handleToggle={() => {}}
        handleDelete={() => {}}
      />
    );

    // Check the main container renders
    const container = screen.getByRole("checkbox").closest("div");
    expect(container).toBeInTheDocument();
  });

  it("renders the checkbox, name, image, link, and button", () => {
    render(
      <SortableItem
        item={defaultItem}
        handleToggle={() => {}}
        handleDelete={() => {}}
      />
    );

    // Check for the checkbox
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();

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
    const deleteButton = screen.getByTestId("mock-button");
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveTextContent("Delete");
  });

  it("renders 'No Image' when imageUrl is invalid", () => {
    const itemWithInvalidImage = { ...defaultItem, imageUrl: "" };

    render(
      <SortableItem
        item={itemWithInvalidImage}
        handleToggle={() => {}}
        handleDelete={() => {}}
      />
    );

    // Check that "No Image" text is rendered
    expect(screen.getByText("No Image")).toBeInTheDocument();
  });

  it("has the correct layout", () => {
    const { container } = render(
      <SortableItem
        item={defaultItem}
        handleToggle={() => {}}
        handleDelete={() => {}}
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