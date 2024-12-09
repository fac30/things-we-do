import { useEffect, useState } from "react";
import { useAddToolForm } from "@/context/AddToolContext";
import Button from "@/ui/shared/Button";
import { useDatabase } from "@/context/DatabaseContext";

interface Categories {
  id: string;
  name: string;
  timestamp: string;
}

export default function AddTags() {
  const database = useDatabase();
  const { formState, setFormState } = useAddToolForm();

  const [categories, setCategories] = useState<string[]>([]);
  const [newCategories, setNewCategories] = useState<string>("");
  const [isAddingNew, setIsAddingNew] = useState(false);

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

  const handleAddNewCategories = async () => {
    if (newCategories.trim()) {
      await database.addCategories(newCategories.trim());
      setCategories((prev) => [...prev, newCategories.trim()]);
      setNewCategories("");
      setIsAddingNew(false);
    }
  };

  const toggleCategories = (categories: string) => {
    setFormState((prev) => ({
      ...prev,
      categories: prev.categories.includes(categories)
        ? prev.categories.filter((c) => c !== categories)
        : [...prev.categories, categories],
    }));
  };

  return (
    <div>
      <p className="text-white">Tags</p>
      <div className="flex flex-wrap gap-2">
        {categories.map((categories) => (
          <Button
            key={categories}
            label={categories}
            onClick={() => toggleCategories(categories)}
            className={`${
              formState.categories.includes(categories)
                ? "bg-twd-secondary-purple text-white"
                : "bg-twd-background text-white"
            } `}
            ariaPressed={formState.categories.includes(categories)}
          />
        ))}

        {isAddingNew ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={newCategories}
              onChange={(e) => setNewCategories(e.target.value)}
              className="bg-twd-background text-white px-3 py-1 rounded"
              placeholder="New categories"
              aria-label="New categories name"
            />
            <Button
              label="Add"
              onClick={handleAddNewCategories}
              className="bg-twd-primary-purple text-white"
            />
            <Button
              label="Cancel"
              onClick={() => {
                setNewCategories("");
                setIsAddingNew(false);
              }}
              className="bg-twd-background text-white"
            />
          </div>
        ) : (
          <Button
            label="+ New Category"
            onClick={() => setIsAddingNew(true)}
            className="bg-twd-secondary-purple text-white"
          />
        )}
      </div>
    </div>
  );
}
