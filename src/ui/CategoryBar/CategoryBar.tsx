"use client";
import { useState } from "react";
import Button from "../shared/Button";

const categoriesBarClass = `
  whitespace-nowrap flex items-center gap-4 px-4 py-2 
  overflow-x-auto bg-twd-background border-b 
  border-gray-700 sm:gap-6 sm:px-6  focus:ring-2 focus:ring-twd-secondary-purple
`;

const CategoriesBar = () => {
  const categories = [
    "All",
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
    "Category 6",
    "Category 7",
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoriesClick = (categories: string) => {
    if (categories === "All") {
      setSelectedCategories(["All"]);
    } else {
      setSelectedCategories((prev) =>
        prev.includes(categories)
          ? prev.filter((c) => c !== categories)
          : [...prev.filter((c) => c !== "All"), categories]
      );
    }
  };

  return (
    <div className={categoriesBarClass}>
      {categories.map((categories) => {
        const isActive = selectedCategories.includes(categories);

        return (
          <Button
            key={categories}
            label={categories}
            className={`${
              isActive
                ? "bg-twd-secondary-purple text-white"
                : "bg-twd-background text-white"
            }`}
            onClick={() => handleCategoriesClick(categories)}
            ariaPressed={isActive}
          />
        );
      })}
    </div>
  );
};

export default CategoriesBar;
