"use client";
import { useEffect, useState } from "react";
import Button from "@/ui/shared/Button";
import { useDatabase } from "@/context/DatabaseContext";
import { useToolkit } from "@/context/ToolkitContext";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

interface Categories {
  id: string;
  name: string;
  timestamp: string;
}
interface CategoriesBarProps {
  openModal: () => void;
  refreshCategories: boolean;
}

const categoriesBarClass = `
  whitespace-nowrap flex items-center justify-center gap-4 px-4 py-2 
  overflow-x-auto bg-twd-background border-b 
  border-gray-700 sm:gap-6 sm:px-6  focus:ring-2 focus:ring-twd-secondary-purple
`;

export default function CategoriesBar({
  openModal,
  refreshCategories,
}: CategoriesBarProps) {
  const database = useDatabase();
  const [categories, setCategories] = useState<string[]>([]);
  const { selectedCategories, setSelectedCategories } = useToolkit();

  useEffect(() => {
    const fetchCategories = async () => {
      const allCategories = await database.getFromDb("categories");
      if (allCategories) {
        setCategories(allCategories.map((cat: Categories) => cat.name));
      } else {
        setCategories([]);
      }
    };
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshCategories]);

  const handleCategoriesClick = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category]
    );
  };

  return (
    <div className={categoriesBarClass} data-testid="categories-bar">
      {/* Fixed "+" Button */}
      <div className="flex-shrink-0 justify-center items-center">
        <button
          onClick={openModal}
          className="flex justify-center items-center"
        >
          <PlusCircleIcon className="w-8 m-auto " />
        </button>
        {/* <Button
          label="+"
          onClick={openModal}
          className="bg-twd-primary-purple"
        /> */}
      </div>

      {/* Scrollable Categories */}
      <div className="flex overflow-x-auto whitespace-nowrap space-x-2 flex-grow">
        <Button
          key={"All"}
          label={"All"}
          className={`${
            selectedCategories.length === 0
              ? "bg-twd-secondary-purple text-white"
              : "bg-twd-background text-white"
          }`}
          onClick={() => setSelectedCategories([])}
          ariaPressed={selectedCategories.length === 0}
        />

        {categories.map((category) => {
          const isActive = selectedCategories.includes(category);

          return (
            <Button
              key={category}
              label={category}
              className={`${
                isActive
                  ? "bg-twd-secondary-purple text-white"
                  : "bg-twd-background text-white"
              }`}
              onClick={() => handleCategoriesClick(category)}
              ariaPressed={isActive}
            />
          );
        })}
      </div>
    </div>
  );
}
