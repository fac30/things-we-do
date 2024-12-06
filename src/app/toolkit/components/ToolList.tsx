"use client";
import { useState, useEffect, useMemo } from "react";
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
import { useToolkit } from "@/context/ToolkitContext";

interface ToolListData {
  id: string;
  name: string;
  category: string[];
  checked: boolean;
  description?: string;
  infoUrl: string;
  imageUrl: string;
  timestamp?: string;
}

export default function ToolList() {
  const [data, setData] = useState<ToolListData[]>([]);
  const { selectedCategories } = useToolkit();

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
  }, []); // Trigger when no tools are in the render list

  // TODO: Toggle checkbox state
  const handleToggle = (id: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // TODO: Delete an item
  const handleDelete = (id: string) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = data.findIndex((item) => item.id === active.id);
      const newIndex = data.findIndex((item) => item.id === over.id);
      setData((prevData) => arrayMove(prevData, oldIndex, newIndex));
    }
  };

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const filteredData = useMemo(() => {
    if (selectedCategories.length === 0) return data;
    return data.filter(item => 
      item.category.some(cat => selectedCategories.includes(cat))
    );
  }, [data, selectedCategories]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      data-testid="dnd-context"
    >
      <SortableContext
        items={filteredData.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col space-y-4">
          {filteredData.map((item) => (
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