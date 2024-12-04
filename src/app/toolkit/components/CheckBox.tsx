"use client";
import { useState, useEffect } from "react";
import DatabaseManager from "@/lib/db/DatabaseManager";
import { 
  DndContext, 
  closestCenter, 
  useSensor, 
  useSensors, 
  MouseSensor, 
  TouchSensor, 
  DragEndEvent 
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

interface CheckBoxComponentData {
  id: string;
  name: string;
  category: string[];
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
    console.log('Fetching toolkit items...');
    const fetchData = async () => {
      try {
        const items = await DatabaseManager.getFromDb("toolkit_items");
        if (items) {
          console.log("Fetched toolkit items:", items);
          setData(items.map((doc) => doc.toJSON())); // Convert RxDocument to plain JSON
        } else {
          console.log("No items found in toolkit_items collection.");
        }
      } catch (error) {
        console.error("Error fetching toolkit items from database:", error);
      }
    };
    fetchData();
  }, [isEmpty]);

  // have to be fixed - Toggle checkbox state
  const handleToggle = (id: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // have to be fixed - Delete an item
  const handleDelete = (id: string) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  // Handle drag-and-drop reorder
  const handleDragEnd = (event: DragEndEvent) => {
    // Updated type for `event`.
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = data.findIndex((item) => item.id === active.id);
      const newIndex = data.findIndex((item) => item.id === over.id);
      setData((prevData) => arrayMove(prevData, oldIndex, newIndex));
    }
  };

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={data.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
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
      </SortableContext>
    </DndContext>
  );
}