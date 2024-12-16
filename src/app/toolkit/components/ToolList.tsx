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
  const [displayedData, setDisplayedData] = useState<ToolkitComponentData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dragOrder, setDragOrder] = useState<string[]>([]);
  const { selectedCategories } = useToolkit();

  
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
          setDragOrder(toolkitData.map((item) => item.id));
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
  const handleToggle = async (id: string) => {
    const updatedData = mainData.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
  
    setMainData(updatedData);
  
    //  `displayedData`
    const orderedData = dragOrder.map((id) =>
      updatedData.find((item) => item.id === id)
    ).filter(Boolean) as ToolkitComponentData[];
  
    setDisplayedData(orderedData);
  
    try {
      const updatedItem = updatedData.find((item) => item.id === id);
      if (updatedItem) {
        await database.updateDocument("toolkit_items", id, "checked", updatedItem.checked);
      }
    } catch (error) {
      console.error("Error updating checked status in database:", error);
    }

    // setMainData((prevData) =>
    //   prevData.map((item) =>
    //     item.id === id ? { ...item, checked: !item.checked } : item
    //   )
    // );
    // setDisplayedData((prevData) =>
    //   prevData.map((item) =>
    //     item.id === id ? { ...item, checked: !item.checked } : item
    //   )
    // );

    // // Find the item to update
    // const updatedItem = mainData.find((item) => item.id === id);
    // if (updatedItem) {
    //   try {
    //     // Update in database
    //     await database.updateDocument("toolkit_items", id, "checked", !updatedItem.checked );
    //   } catch (error) {
    //     console.error("Error updating checked status in database:", error);
    //   }
    // }
  };

  // Delete an item
  const handleDelete = async (id: string) => {
    try {
      await database.deleteFromDb("toolkit_items", id);
      setMainData((prevData) => prevData.filter((item) => item.id !== id));
      // setDisplayedData((prevData) => prevData.filter((item) => item.id !== id));
      setDragOrder((prevOrder) => prevOrder.filter((itemId) => itemId !== id));

      const orderedData = dragOrder
        .filter((itemId) => itemId !== id)
        .map((id) => mainData.find((item) => item.id === id))
        .filter(Boolean) as ToolkitComponentData[];

      setDisplayedData(orderedData);
    } catch (error) {
      console.error("Error in handleDelete:", error);
    }
  };

  // Handle drag-and-drop reordering
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const newOrder = [...dragOrder];
    const [movedItem] = newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, movedItem);

    setDragOrder(newOrder);

    // Обновляем `displayedData` в соответствии с новым порядком
    const orderedData = newOrder.map((id) =>
      mainData.find((item) => item.id === id)
    ).filter(Boolean) as ToolkitComponentData[];

    setDisplayedData(orderedData);

    // const reorderedData = [...displayedData];
    // const [movedItem] = reorderedData.splice(source.index, 1);
    // reorderedData.splice(destination.index, 0, movedItem);

    // setDisplayedData(reorderedData);
  };

  // Handle search queries
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mainData.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    const orderedData = dragOrder
      .map((id) => filtered.find((item) => item.id === id))
      .filter(Boolean) as ToolkitComponentData[];

    setDisplayedData(orderedData);
    // if (query) {
    //   const filtered = mainData.filter((item) =>
    //     item.name.toLowerCase().includes(query.toLowerCase())
    //   );
    //   setDisplayedData(filtered);
    // } else {
    //   setDisplayedData(mainData);
    // }
  };

  // Clear search input
  const handleClearSearch = () => {
    setSearchQuery("");
    // setDisplayedData(mainData);
    // Restore displayedData to match dragOrder
    const orderedData = dragOrder
      .map((id) => mainData.find((item) => item.id === id))
      .filter(Boolean) as ToolkitComponentData[];

    setDisplayedData(orderedData);
  };

  // Filter data based on selected categories
  const filteredData = useMemo(() => {
    if (selectedCategories.length === 0) return mainData;
    return mainData.filter((item) =>
      item.categories.some((cat) => selectedCategories.includes(cat))
    );
  }, [mainData, selectedCategories]);

  // useEffect(() => {
  //   if (searchQuery) {
  //     // Filter the current displayed data (based on categories) by the search query
  //     const searchFilteredData = (
  //       selectedCategories.length > 0 ? filteredData : mainData
  //     ).filter((item) =>
  //       item.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //     setDisplayedData(searchFilteredData);
  //   } else if (selectedCategories.length > 0) {
  //     // Show filtered data by categories when no search query
  //     setDisplayedData(filteredData);
  //   } else {
  //     // Show all data if no categories or search query
  //     setDisplayedData(mainData);
  //   }
  // }, [filteredData, searchQuery, selectedCategories.length, mainData]);

  // Filter data based on selected categories
  useEffect(() => {
    let filteredData = mainData;

    if (selectedCategories.length > 0) {
      filteredData = filteredData.filter((item) =>
        item.categories.some((cat) => selectedCategories.includes(cat))
      );
    }

    if (searchQuery) {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const orderedData = dragOrder
      .map((id) => filteredData.find((item) => item.id === id))
      .filter(Boolean) as ToolkitComponentData[];

    setDisplayedData(orderedData);
  }, [filteredData, mainData, searchQuery, selectedCategories, dragOrder]);

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
