"use client";
import { useState, useEffect } from "react";
import rxdbInit from '@/lib/db/rxdbInit';
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
    console.log('useeffect');
    const fetchData = async () => {
      try {

        const db = await rxdbInit();

        const itemsCollection = db.toolkit_items;

        const items = await itemsCollection.find().exec();
        console.log(items);

        setData(items.map((doc) => doc.toJSON())); 

      } catch (error) {
        console.error("Error fetching tasks from database:", error);
      }
    };
    fetchData();
  }, [isEmpty]);

  // Toggle checkbox state
  const handleToggle = (id: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Delete an item
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