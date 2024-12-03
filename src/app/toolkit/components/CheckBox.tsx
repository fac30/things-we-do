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

  // Fetch dummy data
  // useEffect(() => {
  //   console.log("useEffect triggered");
  //   const fetchData = async () => {
  //     console.log("Fetching data...");
  //     const dummyData: CheckBoxComponentData[] = [
  //       {
  //         id: 1,
  //         name: "Listen to my favourite music",
  //         category: ["Replace", "Barrier"],
  //         checked: false,
  //         infoUrl: "https://google.com/music",
  //         imageUrl: "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg",
  //       },
  //       {
  //         id: 2,
  //         name: "Watch TV",
  //         category: ["Distract"],
  //         checked: false,
  //         infoUrl: "https://google.com/tv",
  //         imageUrl: "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg",
  //       },
  //       {
  //         id: 3,
  //         name: "Call a friend",
  //         category: ["Distract", "Change status"],
  //         checked: false,
  //         infoUrl: "https://example.com/call",
  //         imageUrl: "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg",
  //       },
  //       {
  //         id: 4,
  //         name: "See a friend",
  //         category: ["Distract", "Change status"],
  //         checked: false,
  //         infoUrl: "https://example.com/call",
  //         imageUrl: "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg",
  //       },
  //       {
  //         id: 6,
  //         name: "Write a book",
  //         category: ["Distract", "Change status"],
  //         checked: false,
  //         infoUrl: "https://example.com/call",
  //         imageUrl: "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg",
  //       },
  //       {
  //         id: 7,
  //         name: "Sing a song",
  //         category: ["Distract", "Change status"],
  //         checked: false,
  //         infoUrl: "https://example.com/call",
  //         imageUrl: "https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg",
  //       },
  //     ];
  //     setData(dummyData);
  //   };
  //   fetchData();
  //   console.log(data);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []); // Removed `data` from dependency array; added eslint-disable-next-line.

  

  useEffect(() => {
    console.log('usereffect');
    const fetchData = async () => {
      try {
        const db = await rxdbInit();
        const itemsCollection = await db.toolkit_items;
        console.log(itemsCollection);
        const items = await itemsCollection.find().exec();
        setData(items);
        console.log(items);

      } catch (error) {
        console.error("Error fetching tasks from database:", error);
      }
    };
    fetchData();
  }, [data.length === 0]);

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
