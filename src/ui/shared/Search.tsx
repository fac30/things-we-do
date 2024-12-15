"use client";

import { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface SearchProps {
  onSearch: (query: string) => void;
  onClear: () => void;
}

export default function Search({ onSearch, onClear }: SearchProps) {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isInputVisible) {
      inputRef.current?.focus();
    }
  }, [isInputVisible]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  const toggleInputVisibility = () => {
    setIsInputVisible((prev) => !prev);
  };

  return (
      <div className="relative flex items-center justify-between">
              {/* Text and magnifying glass on one line */}
        <span className="text-white font-normal text-md my-4">
          Fill your toolkit with things that <span className="">help</span>
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
              role="textbox"
              type="text"
              aria-label="Search input"
              value={query}
              onChange={handleInputChange}
              placeholder="Search..."
              className="w-full bg-twd-background px-3 py-2 rounded-md border border-gray-300"
            />
            <button
              onClick={() => {
                handleClear();
                toggleInputVisibility();
              }}
              className="absolute right-3 top-2 text-gray-500"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

  );
}
