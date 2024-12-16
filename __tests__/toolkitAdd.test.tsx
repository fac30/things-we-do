import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import Inputs from "@/app/toolkit/add-tool/components/AddToolInputs"; // Adjust the path if needed
import { AddToolProvider } from "@/context/AddToolContext";
import AddToolPage from "@/app/toolkit/add-tool/page";
import { useDatabase } from "@/context/DatabaseContext";
import { validateUrl } from "@/lib/utils/validateUrl";

jest.mock("@/lib/utils/validateUrl", () => ({
  validateUrl: jest.fn(),
}));

jest.mock("@/context/DatabaseContext", () => ({
  useDatabase: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe("Inputs Component", () => {
  const mockDatabase = {
    addToDb: jest.fn(),
    addCategories: jest.fn(),
    getFromDb: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useDatabase as jest.Mock).mockReturnValue(mockDatabase);
    (validateUrl as jest.Mock).mockImplementation(() => ({
      isValid: true,
      url: "https://test.com",
    }));
  });

  it("renders all form components", () => {
    render(
      <AddToolProvider>
        <Inputs />
      </AddToolProvider>
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Tags")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Image URL")).toBeInTheDocument();
    expect(screen.getByText("Link")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Tool" })
    ).toBeInTheDocument();
  });
});

describe("AddToolInputs Component", () => {
  const mockDatabase = {
    getFromDb: jest.fn(),
    addToDb: jest.fn(),
    accessDatabase: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (validateUrl as jest.Mock).mockImplementation(() => ({
      isValid: true,
      url: "https://test.com",
    }));
    (useDatabase as jest.Mock).mockImplementation(() => mockDatabase);
    (window.alert as jest.Mock) = jest.fn();
    (window.confirm as jest.Mock) = jest.fn();
  });

  it("renders all form components", () => {
    render(
      <AddToolProvider>
        <AddToolPage />
      </AddToolProvider>
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Tags")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Image URL")).toBeInTheDocument();
    expect(screen.getByText("Link")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Tool" })
    ).toBeInTheDocument();
  });

describe("AddToolTags Component", () => {
    it("renders existing categories", async () => {
      mockDatabase.getFromDb.mockResolvedValue([
        { name: "Category 1" },
        { name: "Category 2" },
      ]);

      render(
        <AddToolProvider>
          <AddToolPage />
        </AddToolProvider>
      );

      await waitFor(() => {
        expect(screen.getByText("Category 1")).toBeInTheDocument();
        expect(screen.getByText("Category 2")).toBeInTheDocument();
      });
    });
  });

  it("initializes form state correctly", () => {
    render(
      <AddToolProvider>
        <AddToolPage />
      </AddToolProvider>
    );

    const inputs = screen.getAllByRole("textbox");
    const nameInput = inputs[0] as HTMLInputElement;
    const descriptionInput = inputs[1] as HTMLInputElement;
    const infoUrlInput = screen.getByRole("textbox", {
      name: "Link",
    }) as HTMLInputElement;
    const imageUrlInput = screen.getByRole("textbox", {
      name: "Image URL",
    }) as HTMLInputElement;

    expect(nameInput.value).toBe("");
    expect(descriptionInput.value).toBe("");
    expect(infoUrlInput.value).toBe("");
    expect(imageUrlInput.value).toBe("");
  });

  it("updates form state on input change", () => {
    render(
      <AddToolProvider>
        <AddToolPage />
      </AddToolProvider>
    );

    const inputs = screen.getAllByRole("textbox");
    const nameInput = inputs[0] as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "Test Tool" } });
    expect(nameInput.value).toBe("Test Tool");
  });
});
