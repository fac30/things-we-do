"use client"
import { useState } from "react"

export default function Search() {
  const [query, setQuery] = useState("")

  return (
    <div className="flex items-center space-x-2 rounded-full bg-gray-200 px-4 py-2">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-transparent focus:outline-none"
      />
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 16l-3-3m0 0l3-3m-3 3h12m-6 5a9 9 0 100-18 9 9 0 000 18z"
          />
        </svg>
      </button>
    </div>
  )
}
