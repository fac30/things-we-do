"use client";
import { useState, useEffect, useMemo } from "react";
import { useDatabase } from "@/context/DatabaseContext";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import SortableItem from "./SortableItem";
import Search from "@/ui/shared/Search";
import { useToolkit } from "@/context/ToolkitContext";

export interface ToolkitComponentData {
  id: string;
  name: string;
  categories: string[];
  checked: boolean;
  description?: string;
  infoUrl: string;
  imageUrl: string;
  timestamp?: string;
}

export default function ToolkitList() {
  const database = useDatabase();
  const [mainData, setMainData] = useState<ToolkitComponentData[]>([]);
  const [displayedData, setDisplayedData] = useState<ToolkitComponentData[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedCategories } = useToolkit();

  // Fetch data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await database.getFromDb("toolkit_items");
        if (items) {
          const toolkitData = items.map(
            (doc) => doc.toJSON() as ToolkitComponentData
          );
          setMainData(toolkitData);
          setDisplayedData(toolkitData);
        } else {
          console.log("No items found in toolkit_items collection.");
        }
      } catch (error) {
        console.error("Error fetching toolkit items from database:", error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Toggle item `checked` state
  const handleToggle = (id: string) => {
    setMainData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
    setDisplayedData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Delete an item
  const handleDelete = async (id: string) => {
    try {
      await database.deleteFromDb("toolkit_items", id);
      setMainData((prevData) => prevData.filter((item) => item.id !== id));
      setDisplayedData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error in handleDelete:", error);
    }
  };

  // Handle drag-and-drop reordering
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const reorderedData = [...displayedData];
    const [movedItem] = reorderedData.splice(source.index, 1);
    reorderedData.splice(destination.index, 0, movedItem);

    setDisplayedData(reorderedData);
  };

  // Handle search queries
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filtered = mainData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setDisplayedData(filtered);
    } else {
      setDisplayedData(mainData);
    }
  };

  // Clear search input
  const handleClearSearch = () => {
    setSearchQuery("");
    setDisplayedData(mainData);
  };

  // Filter data based on selected categories
  const filteredData = useMemo(() => {
    if (selectedCategories.length === 0) return mainData;
    return mainData.filter((item) =>
      item.categories.some((cat) => selectedCategories.includes(cat))
    );
  }, [mainData, selectedCategories]);

  useEffect(() => {
    if (searchQuery) {
      // Filter the current displayed data (based on categories) by the search query
      const searchFilteredData = (
        selectedCategories.length > 0 ? filteredData : mainData
      ).filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDisplayedData(searchFilteredData);
    } else if (selectedCategories.length > 0) {
      // Show filtered data by categories when no search query
      setDisplayedData(filteredData);
    } else {
      // Show all data if no categories or search query
      setDisplayedData(mainData);
    }
  }, [filteredData, searchQuery, selectedCategories.length, mainData]);

  return (
    <div className="toolkit-container">
      {/* Search Component */}
      <Search onSearch={handleSearch} onClear={handleClearSearch} />
      <p className="text-xs text-slate-300 mt-1 mb-4">
        Hold and drag to rearrange items
      </p>
      {/* Drag-and-Drop Context */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="toolkit">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col space-y-4"
            >
              {displayedData.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <SortableItem
                        item={item}
                        handleToggle={handleToggle}
                        handleDelete={handleDelete}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
