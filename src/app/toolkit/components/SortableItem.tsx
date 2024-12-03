"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Button from "@/ui/shared/Button";

interface SortableItemProps {
  item: {
    id: string;
    name: string;
    category: string[];
    checked: boolean;
    description?: string,
    infoUrl: string,
    imageUrl: string,
    timestamp?: string,
  };
  handleToggle: (id: string) => void;
  handleDelete: (id: string) => void;
}

export default function SortableItem({
  item,
  handleToggle,
  handleDelete,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col items-start p-4 rounded-lg shadow-lg bg-twd-background"
    >
      {/* First Row: Checkbox and Name */}
      <div className="flex items-center space-x-3 w-full">
        <input
          type="checkbox"
          checked={item.checked}
          onChange={() => {
            console.log("Checkbox clicked for ID:", item.id);
            handleToggle(item.id);
          }}
          className="h-5 w-5 border-white bg-twd-background text-twd-background rounded focus:ring focus:ring-blue-300"
        />
        <p
          className={`text-lg ${
            item.checked ? "line-through text-gray-400" : "text-white"
          }`}
        >
          {item.name}
        </p>
      </div>

      {/* Second Row: Image, Link, and Delete Button */}
      <div className="flex items-center justify-between mt-2 pl-8 w-full">
        {/* Display the image */}
        <img
            src={item.imageUrl}
            alt={item.name}
            className="h-10 w-10 object-cover"
        />
        <a
          href={item.infoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-twd-text-link hover:underline"
        >
          Go to resource
        </a>
        <Button label="Delete" onClick={() => handleDelete(item.id)} />
      </div>
    </div>
  );
}
