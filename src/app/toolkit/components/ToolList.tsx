"use client";
import { useState, useEffect } from "react";
import DatabaseManager from "@/lib/db/DatabaseManager";
// import { 
//   DndContext, 
//   closestCenter, 
//   useSensor, 
//   useSensors, 
//   MouseSensor, 
//   TouchSensor, 
//   DragEndEvent 
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   verticalListSortingStrategy,
//   arrayMove,
// } from "@dnd-kit/sortable";
//import { SmartPointerSensor } from "./SmartPointerSensor";
//import { restrictToWindowEdges } from '@dnd-kit/modifiers';
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

  // stop for now - this function is blocking other action (like delete and toggle) in the tool 
  // const handleDragEnd = (event: DragEndEvent) => {
  //   const { active, over } = event;

  //   if (over && active.id !== over.id) {
  //     const oldIndex = data.findIndex((item) => item.id === active.id);
  //     const newIndex = data.findIndex((item) => item.id === over.id);
  //     setData((prevData) => arrayMove(prevData, oldIndex, newIndex));
  //   }
  // };

  // const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  // const sensors = useSensors(
  //   useSensor(SmartPointerSensor) // Include the custom sensor
  // );


  return (
    // <DndContext
    //   sensors={sensors}
    //   collisionDetection={closestCenter}
    //   onDragEnd={handleDragEnd}
    //   modifiers={[restrictToWindowEdges]} //Ensures that the drag movement does not exceed the boundaries of the browser window, which is particularly useful for mobile screens.
    //   data-testid="dnd-context"
    // >
    //   <SortableContext
    //     items={data.map((item) => item.id)}
    //     strategy={verticalListSortingStrategy}
    //   >
        <div className="flex flex-col space-y-4">
          {data.map((item) => (
            <SortableItem
              key={item.id}
              item={item}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
            />
          ))}
        </div>
  //   </SortableContext>
  //  </DndContext>
  )
}