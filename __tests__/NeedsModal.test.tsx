import { render, screen, fireEvent } from "@testing-library/react";
import NeedsModal from "@/app/needs/components/NeedsModal";

describe("NeedsModal Component", () => {
  const mockHandleCloseClick = jest.fn();
  const mockHandleBackClick = jest.fn();
  const mockHandlePositiveClick = jest.fn();
  const mockHandleNegativeClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("closes the modal on close icon click", () => {
    render(
      <NeedsModal
        modalOpen={true}
        title="Test Need"
        needsStep={2}
        urgent={0}
        effortful={0}
        worthDoing={0}
        positiveLabel="Next"
        negativeLabel="Skip"
        handlePositiveClick={mockHandlePositiveClick}
        handleNegativeClick={mockHandleNegativeClick}
        handleBackClick={mockHandleBackClick}
        handleCloseClick={mockHandleCloseClick}
      />
    );

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);
    expect(mockHandleCloseClick).toHaveBeenCalled();
  });

  test("renders modal content correctly", () => {
    render(
      <NeedsModal
        modalOpen={true}
        title="Test Need"
        needsStep={1}
        urgent={0}
        effortful={0}
        worthDoing={0}
        positiveLabel="Next"
        negativeLabel="Skip"
        handlePositiveClick={mockHandlePositiveClick}
        handleNegativeClick={mockHandleNegativeClick}
        handleBackClick={mockHandleBackClick}
        handleCloseClick={mockHandleCloseClick}
      />
    );

    expect(screen.getByText("Step 1 of 3")).toBeInTheDocument();
    expect(screen.getByText("Test Need")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Select the button that best describes meeting this need right now."
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Skip" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
  });

  test("handles the back button click on step 2 or higher", () => {
    render(
      <NeedsModal
        modalOpen={true}
        title="Test Need"
        needsStep={2}
        urgent={0}
        effortful={0}
        worthDoing={0}
        positiveLabel="Next"
        negativeLabel="Skip"
        handlePositiveClick={mockHandlePositiveClick}
        handleNegativeClick={mockHandleNegativeClick}
        handleBackClick={mockHandleBackClick}
        handleCloseClick={mockHandleCloseClick}
      />
    );

    const backButton = screen.getByRole("button", { name: "Back" });
    fireEvent.click(backButton);
    expect(mockHandleBackClick).toHaveBeenCalled();
  });

  test("handles positive button click", () => {
    render(
      <NeedsModal
        modalOpen={true}
        title="Test Need"
        needsStep={1}
        urgent={0}
        effortful={0}
        worthDoing={0}
        positiveLabel="Next"
        negativeLabel="Skip"
        handlePositiveClick={mockHandlePositiveClick}
        handleNegativeClick={mockHandleNegativeClick}
        handleBackClick={mockHandleBackClick}
        handleCloseClick={mockHandleCloseClick}
      />
    );

    const positiveButton = screen.getByRole("button", { name: "Next" });
    fireEvent.click(positiveButton);
    expect(mockHandlePositiveClick).toHaveBeenCalled();
  });

  test("handles negative button click", () => {
    render(
      <NeedsModal
        modalOpen={true}
        title="Test Need"
        needsStep={1}
        urgent={0}
        effortful={0}
        worthDoing={0}
        positiveLabel="Next"
        negativeLabel="Skip"
        handlePositiveClick={mockHandlePositiveClick}
        handleNegativeClick={mockHandleNegativeClick}
        handleBackClick={mockHandleBackClick}
        handleCloseClick={mockHandleCloseClick}
      />
    );

    const negativeButton = screen.getByRole("button", { name: "Skip" });
    fireEvent.click(negativeButton);
    expect(mockHandleNegativeClick).toHaveBeenCalled();
  });
});
