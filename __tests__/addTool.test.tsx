import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import AddToolPage from "@/app/addTool/page";
import rxdbInit from "@/lib/db/rxdbInit";
import { validateUrl } from "@/lib/utils/validateUrl";
import { act } from "react-dom/test-utils";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  usePathname: jest.fn(() => "/addTool"),
}));

jest.mock("@/lib/db/rxdbInit", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/lib/utils/validateUrl", () => ({
  validateUrl: jest.fn(),
}));

describe("Add Tool", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockDb = {
    categories: {
      find: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([
          { name: "Category 1" },
          { name: "Category 2" },
        ]),
      }),
    },
    toolkit_items: {
      insert: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (rxdbInit as jest.Mock).mockResolvedValue(mockDb);
  });

  it("renders without crashing", async () => {
    await act(async () => {
      render(<AddToolPage />);
    });
    expect(screen.getByRole('heading', { name: "Add Tool" })).toBeInTheDocument();
  });

  it("renders all form components", () => {
    render(<AddToolPage />);
    
    // Check for all input fields and labels
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Tags")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    // TODO expect(screen.getByText("imageUrl")).toBeInTheDocument();
    expect(screen.getByText("Link")).toBeInTheDocument();
    
    // Check for submit button
    expect(screen.getByRole("button", { name: "Add Tool" })).toBeInTheDocument();
  });

  it("loads categories from database", async () => {
    render(<AddToolPage />);
    
    await waitFor(() => {
      expect(rxdbInit).toHaveBeenCalled();
      expect(mockDb.categories.find).toHaveBeenCalled();
    });
  });

  it("handles form input changes", () => {
    render(<AddToolPage />);
    
    const nameInput = screen.getByLabelText("Name");
    const descriptionInput = screen.getByLabelText("Description");
    const infoUrlInput = screen.getByLabelText("Link");
    
    fireEvent.change(nameInput, { target: { value: "Test Tool" } });
    fireEvent.change(descriptionInput, { target: { value: "Test Description" } });
    fireEvent.change(infoUrlInput, { target: { value: "https://test.com" } });
    
    expect(nameInput).toHaveValue("Test Tool");
    expect(descriptionInput).toHaveValue("Test Description");
    expect(infoUrlInput).toHaveValue("https://test.com");
  });

  it("validates URLs before submission", async () => {
    render(<AddToolPage />);
    
    // Mock validateUrl to return invalid
    (validateUrl as jest.Mock).mockReturnValue({
      isValid: false,
      error: "Invalid URL",
    });
    
    const infoUrlInput = screen.getByLabelText("Link");
    fireEvent.change(infoUrlInput, { target: { value: "invalid-url" } });
    
    const submitButton = screen.getByRole("button", { name: "Add Tool" });
    fireEvent.click(submitButton);
    
    expect(window.alert).toHaveBeenCalledWith("Invalid URL: Invalid URL");
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it("successfully submits form and redirects", async () => {
    render(<AddToolPage />);
    
    (validateUrl as jest.Mock).mockReturnValue({
      isValid: true,
      url: "https://test.com",
    });
    
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Test Tool" },
    });

    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Test Description" },
    });

    fireEvent.change(screen.getByLabelText("Link"), {
      target: { value: "https://test.com" },
    });
    
    const submitButton = screen.getByRole("button", { name: "Add Tool" });

    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockDb.toolkit_items.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Test Tool",
          description: "Test Description",
          infoUrl: "https://test.com",
        })
      );
      expect(mockRouter.push).toHaveBeenCalledWith("/toolkit");
    });
  });

  it("handles database errors gracefully", async () => {
    render(<AddToolPage />);
    
    (rxdbInit as jest.Mock).mockRejectedValue(new Error("Database error"));
    console.error = jest.fn();
    
    const submitButton = screen.getByRole("button", { name: "Add Tool" });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "Error submitting form:",
        expect.any(Error)
      );
    });
  });
});