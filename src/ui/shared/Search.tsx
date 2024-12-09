"use client";

import { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface SearchProps {
  onSearch: (query: string) => void; // Sends search query to the parent
  onClear: () => void;              // Notifies the parent to clear search
}

export default function Search({ onSearch, onClear }: SearchProps) {
  const [isInputVisible, setIsInputVisible] = useState(false); // Toggle search input visibility
  const [query, setQuery] = useState(""); // Local state for search query
  const inputRef = useRef<HTMLInputElement | null>(null); // Reference to the input field

  // Automatically focus input when it becomes visible
  useEffect(() => {
    if (isInputVisible) {
      inputRef.current?.focus();
    }
  }, [isInputVisible]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Notify the parent about the search query
  };

  const handleClear = () => {
    setQuery(""); // Clear local query state
    onClear();    // Notify the parent to clear search results
  };

  const toggleInputVisibility = () => {
    setIsInputVisible((prev) => !prev);
  };

  return (
    <div className="relative flex items-center space-x-2">
      {/* Text and magnifying glass on one line */}
      <div className="flex items-center justify-between">
        <span className="text-white font-thin text-md my-4">
          Fill your toolkit with things that <span className="font-bold">help</span> if you are spiralling:
        </span>
        {/* Conditionally render the magnifying glass */}
        {!isInputVisible && (
          <button onClick={toggleInputVisibility} className="p-2">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
          </button>
        )}

        {isInputVisible && (
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search..."
              className="w-full bg-twd-background px-3 py-2 rounded-md border border-gray-300"
            />
            <button
              onClick={() => {
                handleClear();     // Clear query
                toggleInputVisibility(); // Hide the input
              }}
              className="absolute right-3 top-2 text-gray-500"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        )}
    </div>
    </div>
  );
}