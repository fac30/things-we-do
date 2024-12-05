"use client";
import { useEffect, useState } from "react";
import Button from "@/ui/shared/Button";
import DatabaseManager from "@/lib/db/DatabaseManager";

interface Category {
  id: string;
  name: string;
  timestamp: string;
}

const categoryBarClass = `
  whitespace-nowrap flex items-center gap-4 px-4 py-2 
  overflow-x-auto bg-twd-background border-b 
  border-gray-700 sm:gap-6 sm:px-6  focus:ring-2 focus:ring-twd-secondary-purple
`;

const CategoryBar = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const allCategories = await DatabaseManager.getFromDb("categories");
      if (allCategories) {
        setCategories(allCategories.map((cat: Category) => cat.name));
      } else {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryClick = (category: string) => {
    if (category === "All") {
      setSelectedCategories(["All"]);
    } else {
      setSelectedCategories((prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev.filter((c) => c !== "All"), category]
      );
    }
  };

  return (
    <div className={categoryBarClass} data-testid="category-bar">
      <Button key={"All"} label={"All"} 
        className={`${
          selectedCategories.length == 0
            ? "bg-twd-secondary-purple text-white"
            : "bg-twd-background text-white"
        } hover:bg-twd-secondary-purple`}
        onClick={() => setSelectedCategories([])}
        ariaPressed={selectedCategories.length == 0}
      />
      
      {categories.map(
        (category) => {
          const isActive = selectedCategories.includes(category);

          return (
            <Button key={category} label={category}
              className={`${isActive
                  ? "bg-twd-secondary-purple text-white"
                  : "bg-twd-background text-white"
              } hover:bg-twd-secondary-purple`}
              onClick={() => handleCategoryClick(category)}
              ariaPressed={isActive}
            />
          );
        }
      )}
    </div>
  );
};

export default CategoryBar;