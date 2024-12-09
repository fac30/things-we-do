"use client";
import { useEffect, useState } from "react";
import Button from "@/ui/shared/Button";
import DatabaseManager from "@/lib/db/DatabaseManager";
import { useToolkit } from "@/context/ToolkitContext";
import Modal from "@/ui/shared/Modal";

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
  const [categories, setCategories] = useState<string[]>([]);
  const { selectedCategories, setSelectedCategories } = useToolkit();
  const [isModalOpen, setModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const allCategories = await DatabaseManager.getFromDb("categories");
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

  const handleAddCategoryClick = () => {
    setModalOpen(true);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const handleSubmitCategory = async () => {
    if (newCategory.trim() === "") return;

    try {
      await DatabaseManager.addCategories(newCategory);
      setCategories((prev) => [...prev, newCategory]);
      setNewCategory("");
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  return (
    <div className={categoriesBarClass} data-testid="categories-bar">
      <Button label="+" onClick={handleAddCategoryClick} />
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
        (categories) => {
          const isActive = selectedCategories.includes(categories);

          return (
            <Button key={categories} label={categories}
              className={`${isActive
                  ? "bg-twd-secondary-purple text-white"
                  : "bg-twd-background text-white"
              } hover:bg-twd-secondary-purple`}
              onClick={() => handleCategoriesClick(categories)}
              ariaPressed={isActive}
            />
          );
        }
      )}
      
      {/* Modal for adding new category */}
      <Modal
        modalOpen={isModalOpen}
        inputModal={true}
        title="Add New Category"
        placeholder="Enter category name"
        forwardButton={{
          label: "Submit",
          action: handleSubmitCategory,
        }}
        backButton={{
          label: "Cancel",
          action: () => setModalOpen(false),
        }}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default CategoriesBar;
