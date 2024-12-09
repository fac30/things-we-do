"use client";
import { useEffect, useState } from "react";
import Button from "@/ui/shared/Button";
import { useDatabase } from "@/context/DatabaseContext";
import { useToolkit } from "@/context/ToolkitContext";

interface Categories {
  id: string;
  name: string;
  timestamp: string;
}

const categoriesBarClass = `
  whitespace-nowrap flex items-center gap-4 px-4 py-2 
  overflow-x-auto bg-twd-background border-b 
  border-gray-700 sm:gap-6 sm:px-6  focus:ring-2 focus:ring-twd-secondary-purple
`;

const CategoriesBar = () => {
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
  }, []);

  const handleCategoriesClick = (categories: string) => {
    setSelectedCategories(
      selectedCategories.includes(categories)
        ? selectedCategories.filter((c) => c !== categories)
        : [...selectedCategories, categories]
    );
  };

  return (
    <div className={categoriesBarClass} data-testid="categories-bar">
      <Button
        key={"All"}
        label={"All"}
        className={`${
          selectedCategories.length == 0
            ? "bg-twd-secondary-purple text-white"
            : "bg-twd-background text-white"
        } hover:bg-twd-secondary-purple`}
        onClick={() => setSelectedCategories([])}
        ariaPressed={selectedCategories.length == 0}
      />

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
            } hover:bg-twd-secondary-purple`}
            onClick={() => handleCategoriesClick(categories)}
            ariaPressed={isActive}
          />
        );
      })}
    </div>
  );
};

export default CategoriesBar;
