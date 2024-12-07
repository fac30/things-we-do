"use client";
import { useState, useEffect } from "react";
import DatabaseManager from "@/lib/db/DatabaseManager";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import SortableItem from "./SortableItem";

interface CheckBoxComponentData {
  id: string;
  name: string;
  categories: string[];
  checked: boolean;
  description?: string;
  infoUrl: string;
  imageUrl: string;
  timestamp?: string;
}

export default function CheckBox() {
  const [data, setData] = useState<CheckBoxComponentData[]>([]);
  const isEmpty = data.length === 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await DatabaseManager.getFromDb("toolkit_items");
        if (items) {
          setData(items.map((doc) => doc.toJSON()));
        } else {
          console.log("No items found in toolkit_items collection.");
        }
      } catch (error) {
        console.error("Error fetching toolkit items from database:", error);
      }
    };
    fetchData();
  }, [isEmpty]);


  const handleToggle = (id: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
    console.log('Button click')
  };

  const handleDelete = async (id: string) => {
    console.log(`handleDelete called with ID: ${id}`);
    try {
      await DatabaseManager.deleteFromDb("toolkit_items", id);
      setData((prevData) => {
        const updatedData = prevData.filter((item) => item.id !== id);
        return updatedData;
      });
    } catch (error) {
      console.error("Error in handleDelete:", error);
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return; // If there's no destination (item dropped outside a valid drop area), return early

    // If the item is dropped in the same position, do nothing
    if (source.index === destination.index && source.droppableId === destination.droppableId) {
      return;
    }
    const reorderedData = Array.from(data);
    const [movedItem] = reorderedData.splice(source.index, 1);
    reorderedData.splice(destination.index, 0, movedItem);

    setData(reorderedData);
  };


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="toolkit">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col space-y-4"
          >
            {data.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <SortableItem
                      key={item.id}
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
  );


  // return (
  //       <div className="flex flex-col space-y-4">
  //         {data.map((item) => (
  //           <SortableItem
  //             key={item.id}
  //             item={item}
  //             handleToggle={handleToggle}
  //             handleDelete={handleDelete}
  //           />
  //         ))}
  //       </div>
  // )
}