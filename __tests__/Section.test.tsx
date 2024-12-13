import Section from "@/app/needs/components/Section";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Section Component", () => {
  const mockHandleOpen = jest.fn();
  const mockCategoryData = {
    key: "Category 1",
    items: [
      {
        id: "1",
        name: "Need 1",
        highlighted: true,
        label: "Need 1",
        mood: "joy",
      },
      {
        id: "2",
        name: "Need 2",
        highlighted: false,
        label: "Need 2",
        mood: "",
      },
    ],
  };

  test("renders section with items", () => {
    render(
      <Section categoryData={mockCategoryData} handleOpen={mockHandleOpen} />
    );

    expect(screen.getByText("Category 1")).toBeInTheDocument();
    expect(screen.getByText("Need 1")).toBeInTheDocument();
    expect(screen.getByText("Need 2")).toBeInTheDocument();
  });

  test("applies correct styles for highlighted and non-highlighted items", () => {
    render(
      <Section categoryData={mockCategoryData} handleOpen={mockHandleOpen} />
    );

    const highlightedButton = screen.getByText("Need 1");
    const nonHighlightedButton = screen.getByText("Need 2");

    expect(highlightedButton).toHaveClass("bg-twd-mood-joy-yellow");
    expect(nonHighlightedButton).toHaveClass("bg-gray-600");
  });

  test("calls handleOpen when item is clicked", () => {
    render(
      <Section categoryData={mockCategoryData} handleOpen={mockHandleOpen} />
    );

    fireEvent.click(screen.getByText("Need 1"));
    expect(mockHandleOpen).toHaveBeenCalledWith(mockCategoryData.items[0]);
  });
});
