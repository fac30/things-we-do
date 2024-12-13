import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NeedsDisplay from "@/app/needs/components/NeedsDisplay";
import { needs, needsCategories } from "@/lib/db/seed/needs";

jest.mock("@/context/DatabaseContext", () => ({
  useDatabase: jest.fn(() => ({
    getFromDb: jest.fn((table) => {
      if (table === "needs_categories") {
        return Promise.resolve(
          needsCategories.map((category) => ({
            ...category,
            toJSON: () => category,
          }))
        );
      }
      if (table === "needs") {
        return Promise.resolve(
          needs.map((need) => ({ ...need, toJSON: () => need }))
        );
      }
    }),
    updateDocument: jest.fn(),
  })),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe("NeedsDisplay Component", () => {
  const mockUpdateDocument = jest
    .requireMock("@/context/DatabaseContext")
    .useDatabase().updateDocument;

  test("handles modal interactions for unselected needs", async () => {
    render(<NeedsDisplay />);
    const unselectedNeed = needs.find((need) => !need.selectedExpiry);
    if (!unselectedNeed) return;

    fireEvent.click(await screen.findByText(unselectedNeed.name));
    expect(
      await screen.findByText(`You have selected ~${unselectedNeed.name}~`)
    ).toBeInTheDocument();
  });

  test("updates the database correctly when deselecting a need", async () => {
    render(<NeedsDisplay />);
    const selectedNeed = needs.find(
      (need) =>
        need.selectedExpiry && new Date(need.selectedExpiry) > new Date()
    );
    if (!selectedNeed) return;

    fireEvent.click(await screen.findByText(selectedNeed.name));
    fireEvent.click(await screen.findByText("Yes"));

    await waitFor(() => {
      expect(mockUpdateDocument).toHaveBeenCalledWith(
        "needs",
        selectedNeed.id,
        "selectedExpiry",
        expect.any(String)
      );
    });
  });
});
