"use client";
import { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ToolkitComponentData } from "@/app/toolkit/components/ToolList";

interface SearchProps {
  items: ToolkitComponentData[];
  onFilter: (filteredData: ToolkitComponentData[]) => void;
}

export default function Search({ items, onFilter }: SearchProps) {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Filter and reorder items
    const filtered = items
      .filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
      .concat(items.filter((item) => !item.name.toLowerCase().includes(value.toLowerCase())));

    // Update the parent component with the new order
    onFilter(filtered);
  };

  const handleCloseInput = () => {
    setIsInputVisible(false);
    setQuery("");
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
          <button
            onClick={() => setIsInputVisible(true)}
            className="p-2"
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
          </button>
        )}
      </div>

      {/* Input field appears below text */}
      {isInputVisible && (
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Type to search..."
            className="w-full bg-twd-background px-3 py-2 rounded-md border border-gray-300"
          />
          {/* Close button inside the input field */}
          <button
            onClick={handleCloseInput}
            className="absolute right-3 top-2 text-gray-500"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}




//     <div className="relative flex items-center">
//       {isOpen ? (
//         <div className="flex items-center space-x-2 rounded-full bg-white px-4 py-2">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="w-full bg-transparent focus:outline-none"
//           />
//           <button
//             onClick={() => setIsOpen(false)}
//             className="flex items-center justify-center"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 text-white"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M10 14l2-2m0 0l2-2m-2 2l-2-2m8 10a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//           </button>
//         </div>
//       ) : (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="flex items-center justify-center w-8 h-8 rounded-full bg-twd-background transition"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 text-gray-300"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <circle cx="11" cy="11" r="8" stroke="currentColor" />
//             <line
//               x1="21"
//               y1="21"
//               x2="16.65"
//               y2="16.65"
//               stroke="currentColor"
//               strokeWidth={2}
//               strokeLinecap="round"
//             />
//           </svg>
//         </button>
//       )}
//     </div>
//   );

