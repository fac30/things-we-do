'use client'
import QuestionMarkButton from "../../../ui/shared/QuestionButton";

export default function SearchBar() {

  return (
    <div className="flex items-center justify-between bg-transparent px-4 py-2 mt-2">
        {/* Left Section: Text and Question Mark Button */}
        <div className="flex items-center space-x-2">
            {/* Text */}
            <p className="text-md font-thin text-white">
            What have you found that <span className="font-bold">helps?</span>
            </p>

            {/* Question Mark Button */}
            <div className="relative">
              <QuestionMarkButton 
                popupText="Use this section to share insights or search for existing solutions."
                direction="bottom"/>
            </div>
        </div>

        {/* Right Section: Search Icon */}
        <div className="ml-4">
            <button className="flex items-center justify-center w-8 h-8 bg-white text-black rounded-full shadow hover:bg-gray-300 transition">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
    </div>
  )
};
