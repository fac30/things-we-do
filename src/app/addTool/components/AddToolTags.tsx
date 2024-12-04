import { useEffect, useState } from "react";
import { useToolkitForm } from "@/context/ToolkitFormContext";
import Button from "@/ui/shared/Button";
import DatabaseManager from "@/lib/db/DatabaseManager";

export default function AddTags() {
  //==> State
  //===> Imported
  const { formState, setFormState } = useToolkitForm();

  //===> Declared
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [isAddingNew, setIsAddingNew] = useState(false);

  //==> Fetch Data
  useEffect(() => {
    const fetchCategories = async () => {
      const allCategories = await DatabaseManager.getFromDb("categories");
      setCategories(allCategories.map((cat: any) => cat.name));
    };
    fetchCategories();
  }, []);

  //==> Handle Interactions
  const handleAddNewCategory = async () => {
    if (newCategory.trim()) {
      await DatabaseManager.addCategory(newCategory.trim());
      setCategories(prev => [...prev, newCategory.trim()]);
      setNewCategory("");
      setIsAddingNew(false);
    }
  };

  return (
    <div>
      <p className="text-white">Tags</p>
      <div className="flex flex-wrap gap-2">
        {/* {categories.map((category) => (
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
        ))} */}
      </div>
    </div>
  );
}
