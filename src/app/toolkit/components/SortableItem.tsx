"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";

interface SortableItemProps {
  item: {
    id: string;
    name: string;
    categories: string[];
    checked: boolean;
    description?: string;
    infoUrl: string;
    imageUrl: string;
    timestamp?: string;
  };
  handleToggle: (id: string) => void;
  handleDelete: (id: string) => void;
}

const isValidUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export default function SortableItem({
  item,
  handleToggle,
  handleDelete,
}: SortableItemProps) {

  return (
    <div
        className="flex items-center p-4 rounded-lg shadow-lg bg-twd-background"
        draggable="false"
    >
        {/* Icon on the left, vertically centered */}
        <div className="flex-shrink-0 pr-4 flex items-center">
          <Bars3Icon className="h-6 w-6 text-gray-400 cursor-grab" />
        </div>

        {/* Main content */}
        <div className="flex flex-col items-start w-full">
          {/* First Row: Checkbox and Name */}
          <div className="flex items-center space-x-3 w-full">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={(e) => {
                e.stopPropagation();
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
          <div className="flex items-center justify-between mt-2 w-full">
            {/* Display the image */}
            {isValidUrl(item.imageUrl) ? (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-10 w-10 object-cover rounded"
              />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
            <a
              href={item.infoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-twd-text-link hover:underline"
            >
              Go to resource
            </a>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(item.id);
              }}
              className="ml-4 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
  )
}