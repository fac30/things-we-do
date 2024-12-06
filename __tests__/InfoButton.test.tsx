import { render, screen, fireEvent } from "@testing-library/react";
import InfoButton from "@/ui/shared/InfoButton";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("InfoButton", () => {
  const mockedPush = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockedPush });
  });

  it("opens the popup when the button is clicked", () => {
    render(<InfoButton popupText="Test Popup" direction="bottomLeft" />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByText("Test Popup")).toBeInTheDocument();
  });

  it("closes the popup when the close button is clicked", () => {
    render(<InfoButton popupText="Test Popup" direction="bottomLeft" />);
    const button = screen.getByRole("button");
    fireEvent.click(button); // Open popup
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);
    expect(screen.queryByText("Test Popup")).not.toBeInTheDocument();
  });

  it("navigates to /info relative route when Learn more is clicked", () => {
    render(<InfoButton popupText="Test Popup" direction="bottomLeft" />);
    const button = screen.getByRole("button");
    fireEvent.click(button); // Open popup
    const learnMoreButton = screen.getByText("Learn more");
    fireEvent.click(learnMoreButton);
    expect(mockedPush).toHaveBeenCalledWith("/info");
  });
});
