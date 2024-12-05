import { useEffect, useState } from "react";
import { useToolkitForm } from "@/context/ToolkitFormContext";
import Button from "@/ui/shared/Button";
import DatabaseManager from "@/lib/db/DatabaseManager";

interface Category {
  id: string;
  name: string;
  timestamp: string;
}

export default function AddTags() {
  const { formState, setFormState } = useToolkitForm();

  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [isAddingNew, setIsAddingNew] = useState(false);

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
  
  const handleAddNewCategory = async () => {
    if (newCategory.trim()) {
      await DatabaseManager.addCategory(newCategory.trim());
      setCategories(prev => [...prev, newCategory.trim()]);
      setNewCategory("");
      setIsAddingNew(false);
    }
  };

  const toggleCategory = (category: string) => {
    setFormState((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  return (
    <div>
      <p className="text-white">Tags</p>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            label={category}
            onClick={() => toggleCategory(category)}
            className={`${
              formState.categories.includes(category)
                ? "bg-twd-secondary-purple text-white"
                : "bg-twd-background text-white"
            } hover:bg-twd-secondary-purple`}
            ariaPressed={formState.categories.includes(category)}
          />
        ))}
        
        {isAddingNew ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="bg-twd-background text-white px-3 py-1 rounded"
              placeholder="New category"
              aria-label="New category name"
            />
            <Button
              label="Add"
              onClick={handleAddNewCategory}
              className="bg-twd-primary-purple hover:bg-twd-secondary-purple text-white"
            />
            <Button
              label="Cancel"
              onClick={() => {
                setNewCategory("");
                setIsAddingNew(false);
              }}
              className="bg-twd-background hover:bg-twd-secondary-purple text-white"
            />
          </div>
        ) : (
          <Button
            label="+ New Category"
            onClick={() => setIsAddingNew(true)}
            className="bg-twd-secondary-purple hover:bg-twd-primary-purple text-white"
          />
        )}
      </div>
    </div>
  );
}
