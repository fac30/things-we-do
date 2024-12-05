import { render, screen } from "@testing-library/react";
import { Header } from "@/ui/shared/Header";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Header", () => {
  it("renders the title and description", () => {
    render(
      <Header
        title="Test Title"
        description="Test Description"
        isHome={false}
      />
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("does not render the InfoButton when isHome is true", () => {
    render(
      <Header title="Test Title" description="Test Description" isHome={true} />
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders the InfoButton when isHome is false", () => {
    render(
      <Header
        title="Test Title"
        description="Test Description"
        isHome={false}
      />
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
