import { render, screen } from "@testing-library/react";
import NavbarLinks from "@/ui/layout/Navbar/NavbarLinks";
import { usePathname } from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("NavbarLinks", () => {
  beforeEach(() => {
    // Mock usePathname to return home path by default
    (usePathname as jest.Mock).mockReturnValue("/");
  });

  it("renders all navigation links", () => {
    render(<NavbarLinks />);

    // Check if all link titles are rendered
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Moods")).toBeInTheDocument();
    expect(screen.getByText("Toolkit")).toBeInTheDocument();
    expect(screen.getByText("Needs")).toBeInTheDocument();
    expect(screen.getByText("Insights")).toBeInTheDocument();
  });

  it("renders correct number of links", () => {
    render(<NavbarLinks />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(5);
  });

  it("renders links with correct destinations", () => {
    render(<NavbarLinks />);

    const links = screen.getAllByRole("link");

    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[1]).toHaveAttribute("href", "/moods");
    expect(links[2]).toHaveAttribute("href", "/toolkit");
    expect(links[3]).toHaveAttribute("href", "/needs");
    expect(links[4]).toHaveAttribute("href", "/insights");
  });

  it("renders with correct layout classes", () => {
    const { container } = render(<NavbarLinks />);
    const navContainer = container.firstChild;

    expect(navContainer).toHaveClass(
      "grid",
      "grid-cols-5",
      "items-center",
      "h-full",
      "w-11/12",
      "m-auto"
    );
  });
});
