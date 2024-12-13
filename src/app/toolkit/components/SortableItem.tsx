"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Button from "@/ui/shared/Button";
// import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Modal from "@/ui/shared/Modal";

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
    new URL(url, window.location.href);
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
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

  return (
    <div
      className="flex items-center p-4 rounded-lg shadow-lg bg-[#1d1b30] border-2 border-[#242139]"
      draggable="false"
    >
      {/* Icon on the left, vertically centered */}
      <div className="flex-shrink-0 pr-4 flex items-center">
        <Bars3Icon className="h-6 w-6 text-gray-400 cursor-grab" />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-start w-full">
        {/* First Row: Checkbox and Name */}
        <div className="flex items-center space-x-3 w-full mb-2">
          <input
            type="checkbox"
            checked={item.checked}
            onChange={(e) => {
              e.stopPropagation();
              handleToggle(item.id);
            }}
            className="h-5 w-5 appearance-none border-2 border-white rounded bg-twd-background checked:bg-white checked:border-white focus:ring focus:ring-twd-primary-purple checked:after:content-['✔']"
          />
          <p
            className={`text-lg ${
              item.checked ? "line-through text-gray-400" : "text-white"
            }`}
          >
            {item.name}
          </p>
        </div>

        {/* Seconow: Image, Link, and Delete Button */}
        <div className="flex items-center justify-between mt-2 w-full">
          {/* Display the image or reserve space */}
          {isValidUrl(item.imageUrl) ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="h-10 w-10 object-cover rounded"
            />
          ) : (
            <div className="h-10 w-10"></div> // Reserve space when no image
          )}

          {/* Display the link or reserve space */}
          {/* {isValidUrl(item.infoUrl) ? (
            <a
              href={item.infoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-twd-primary-purple text-sm rounded-full font-normal py-[6px] px-[14px]"
            >
              Go to resource
            </a>
          ) : (
            <div className="w-24"></div> // Reserve space for the link (adjust width as needed)
          )} */}

          {isValidUrl(item.infoUrl) ? (
            <button
              onClick={() => {
                setIsLinkModalOpen(true);
              }}
              className="bg-twd-primary-purple text-sm rounded-full font-normal py-[6px] px-[14px]"
            >
              Go to resource
            </button>
          ) : (
            <div className="w-24"></div>
          )}

          {/* Delete button */}
          {/* <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(item.id);
            }}
            className="ml-4 text-white"
          >
            Delete
          </button> */}
          <Button
            onEventClick={(e) => {
              e.stopPropagation();
              handleDelete(item.id);
            }}
            label="delete"
            className="bg-twd-secondary-purple  font-normal py-[6px] px-[14px]"
          />
        </div>
      </div>
      <Modal
        modalOpen={isLinkModalOpen}
        forwardButton={{
          action: () => {
            const link = item.infoUrl; // Replace with your link
            window.open(link, "_blank"); // Opens in a new tab
          },
          label: "Leave the app?",
        }}
        backButton={{
          action: () => {
            setIsLinkModalOpen(false);
          },
          label: "No",
        }}
      />
    </div>
  );
}
