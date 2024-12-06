"use client";
import Search from "@/ui/shared/Search";

export default function SearchBar() {
  return (
    <div className="flex items-center justify-between bg-transparent px-4 py-2 mt-2">
      {/* Left Section: Text and Question Mark Button */}
      <div className="flex items-center space-x-2">
        {/* Text */}
        <p className="text-md font-thin text-white">
          Fill your toolkit with things that <span className="font-bold">help</span> if you are spiralling:
        </p>
      </div>

      {/* Right Section: Search Icon */}
      <div className="ml-4">
        <Search />
      </div>
    </div>
  );
}