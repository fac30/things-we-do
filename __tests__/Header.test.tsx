import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "@/ui/shared/Header";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Header", () => {
  const mockedBack = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ back: mockedBack });
  });

  it("renders the title and description", () => {
    render(
      <Header
        title="Test Title"
        description="Test Description"
        hasInfoButton={false}
        isInfoPage={false}
      />
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("does not render the InfoButton when hasInfoButton is false", () => {
    render(
      <Header
        title="Test Title"
        description="Test Description"
        hasInfoButton={false}
        isInfoPage={false}
      />
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders the InfoButton when hasInfoButton is true", () => {
    render(
      <Header
        title="Test Title"
        description="Test Description"
        hasInfoButton={true}
        isInfoPage={false}
      />
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders the back button when isInfoPage is true", () => {
    render(
      <Header
        title="Test Title"
        description="Test Description"
        hasInfoButton={false}
        isInfoPage={true}
      />
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls router.back when the back button is clicked", () => {
    render(
      <Header
        title="Test Title"
        description="Test Description"
        hasInfoButton={false}
        isInfoPage={true}
      />
    );
    const backButton = screen.getByRole("button");
    fireEvent.click(backButton);
    expect(mockedBack).toHaveBeenCalled();
  });
});
