import { addToDb } from "@/models/addToDb";
import rxdbInit from "@/lib/db/rxdbInit";

jest.mock("@/lib/db/rxdbInit");

describe("addToDb", () => {
  const mockCollection = {
    insert: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should insert a document into the database successfully", async () => {
    const mockDb = {
      mood_records: mockCollection,
    };
    (rxdbInit as jest.Mock).mockResolvedValue(mockDb);
    const document = { name: "Test Mood" };

    mockCollection.insert.mockResolvedValue(document);

    const result = await addToDb("mood_records", document);

    expect(result).toEqual(document);
    expect(mockCollection.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(String),
        createdAt: expect.any(String),
      })
    );
  });

  it("should log an error if database initialization fails", async () => {
    (rxdbInit as jest.Mock).mockResolvedValue(null);
    console.error = jest.fn();

    await addToDb("mood_records", {});

    expect(console.error).toHaveBeenCalledWith(
      "Database initialization failed"
    );
  });

  it("should log an error if the collection is not found", async () => {
    const mockDb = {};
    (rxdbInit as jest.Mock).mockResolvedValue(mockDb);
    console.error = jest.fn();

    await addToDb("mood_records", {});

    expect(console.error).toHaveBeenCalledWith(
      "Collection 'mood_records' not found"
    );
  });

  it("should log an error if there is an error during document insertion", async () => {
    const mockDb = {
      mood_records: mockCollection,
    };
    (rxdbInit as jest.Mock).mockResolvedValue(mockDb);
    const document = { name: "Test Mood" };

    mockCollection.insert.mockRejectedValue(new Error("Insertion error"));
    console.error = jest.fn();

    await addToDb("mood_records", document);

    expect(console.error).toHaveBeenCalledWith(
      "Error adding document to database:",
      expect.any(Error)
    );
  });
});
