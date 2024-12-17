# NextActions.test.tsx

```tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useDatabase } from "@/context/DatabaseContext";
import { useRouter } from "next/navigation";
import NextActionsPage from "@/app/needs/next-actions/page";
import NextActionsDisplay from "@/app/needs/next-actions/components/NextActionsDisplay";
import NextActionsSection from "@/app/needs/next-actions/components/NextActionsSection";

jest.mock("@/context/DatabaseContext", () => ({
  useDatabase: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("NextActions Tests", () => {
  const mockGetFromDb = jest.fn();
  const mockUpdateDocument = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useDatabase as jest.Mock).mockReturnValue({
      getFromDb: mockGetFromDb,
      updateDocument: mockUpdateDocument,
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  describe("NextActionsPage", () => {
    test("renders header and instructions", () => {
      render(<NextActionsPage />);
      expect(screen.getByText("Next Actions")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Add your own next actions to meet the needs that you selected:"
        )
      ).toBeInTheDocument();
    });
  });

  describe("NextActionsDisplay component", () => {
    beforeEach(() => {
      mockGetFromDb.mockReset();
      mockUpdateDocument.mockReset();
    });

    test("displays a message when no unmet needs are selected", async () => {
      mockGetFromDb.mockImplementation((table: string) => {
        if (table === "needs") {
          return Promise.resolve([]);
        }
        if (table === "next_actions") {
          return Promise.resolve([]);
        }
        return Promise.resolve([]);
      });

      render(<NextActionsDisplay />);

      expect(
        await screen.findByText(
          "You have no unmet needs selected. Review which needs might be unmet before we can recommend next actions to meet them."
        )
      ).toBeInTheDocument();
    });

    test("displays actions grouped by priority when unmet needs are selected", async () => {
      const mockNeeds = [
        {
          id: "need1",
          name: "Test Need",
          category: "cat1",
          selectedTimestamps: [],
          selectedExpiry: new Date(Date.now() + 3600 * 1000).toISOString(),
          priority: { order: 1, name: "do it first" },
          timestamp: new Date().toISOString(),
          toJSON() {
            return this;
          },
        },
      ];

      const mockNextActions = [
        {
          id: "action1",
          name: "Test Action",
          need: "need1",
          selectedTimestamps: [],
          selectedExpiry: new Date().toISOString(),
          timestamp: new Date().toISOString(),
          toJSON() {
            return this;
          },
        },
      ];

      mockGetFromDb.mockImplementation((table: string) => {
        if (table === "needs") {
          return Promise.resolve(mockNeeds);
        }
        if (table === "next_actions") {
          return Promise.resolve(mockNextActions);
        }
        return Promise.resolve([]);
      });

      render(<NextActionsDisplay />);

      expect(await screen.findByText("Do it first")).toBeInTheDocument();
      expect(
        screen.getByText(
          "To meet a need for test need, which actions can you take next?"
        )
      ).toBeInTheDocument();
      expect(screen.getByText("Test Action")).toBeInTheDocument();
    });
  });

  describe("NextActionsSection component", () => {
    beforeEach(() => {
      mockGetFromDb.mockReset();
      mockUpdateDocument.mockReset();
    });

    test("toggles action highlighting on button click", async () => {
      const mockNeed = {
        id: "need1",
        name: "Test Need",
        category: "cat1",
        selectedTimestamps: [],
        selectedExpiry: new Date(Date.now() + 3600 * 1000).toISOString(),
        timestamp: new Date().toISOString(),
      };

      const mockAction = {
        id: "action1",
        name: "Test Action",
        need: "need1",
        selectedTimestamps: [],
        selectedExpiry: new Date().toISOString(),
        timestamp: new Date().toISOString(),
      };

      const onToggleAction = jest.fn(async () => {
        await mockUpdateDocument(
          "next_actions",
          "action1",
          "selectedTimestamps",
          [new Date().toISOString()]
        );
      });

      render(
        <NextActionsSection
          need={mockNeed}
          actions={[mockAction]}
          onToggleAction={onToggleAction}
        />
      );

      const actionButton = screen.getByText("Test Action");
      expect(actionButton).toBeInTheDocument();

      fireEvent.click(actionButton);
      await waitFor(() =>
        expect(onToggleAction).toHaveBeenCalledWith(mockAction)
      );

      expect(mockUpdateDocument).toHaveBeenCalledWith(
        "next_actions",
        "action1",
        "selectedTimestamps",
        expect.any(Array)
      );
    });
  });
});
```
