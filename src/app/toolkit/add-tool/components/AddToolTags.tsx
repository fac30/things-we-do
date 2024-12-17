import { useEffect, useState } from "react";
import { useAddToolForm } from "@/context/AddToolContext";
import Button from "@/ui/shared/Button";
import Modal from "@/ui/shared/Modal";
import { useDatabase } from "@/context/DatabaseContext";
import { RxDocument } from "rxdb";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

interface Categories {
  id: string;
  name: string;
  timestamp: string;
}

export default function AddTags() {
  const database = useDatabase();
  const { formState, setFormState } = useAddToolForm();
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const allCategories = await database.getFromDb<RxDocument<Categories>>(
        "categories"
      );
      if (allCategories) {
        setCategories(allCategories.map((cat: Categories) => cat.name));
      } else {
        setCategories([]);
      }
    };

    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setFormState((prev) => ({
        ...prev,
        pendingCategories: [...prev.pendingCategories, newCategory.trim()],
        categories: [...prev.categories, newCategory.trim()],
      }));

      setNewCategory("");

      setModalOpen(false);
    }
  };

  const toggleCategory = (category: string) => {
    setFormState((prev) => ({
      ...prev,
      categories: prev.categories.includes(category) ?
        prev.categories.filter((c) => c !== category) :
        [...prev.categories, category],
    }));
  };

  return (
    <div>
      <p className="text-white block mb-2">
        Tags
      </p>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => ( <Button key={ category }
          label={ category }
          onClick={ () => toggleCategory(category) }
          className={`${formState.categories.includes(category)
            ? "bg-twd-secondary-purple text-white"
            : "bg-twd-background text-white"
          } font-normal`}
          ariaPressed={ formState.categories.includes(category) }
        /> ))}

        {formState.pendingCategories.map((category) => ( <Button key={category}
          label={category}
          onClick={() => toggleCategory(category)}
          className={`${
            formState.categories.includes(category)
              ? "bg-twd-secondary-purple text-white"
              : "bg-twd-background text-white"
          }`}
          ariaPressed={formState.categories.includes(category)}
        /> ))}

        <button onClick={() => setModalOpen(true)}
          className="flex justify-center items-center"
          aria-label="Add tag"
        >
          <PlusCircleIcon className="w-7 m-auto" />
        </button>
      </div>

      <Modal
        inputModal={true}
        modalOpen={modalOpen}
        title="Add New Tag"
        placeholder="Enter your tag name"
        handleInputChange={handleInputChange}
        forwardButton={{
          label: "Add",
          action: handleAddCategory,
        }}
        backButton={{
          label: "Cancel",
          action: () => {
            setNewCategory("");
            setModalOpen(false);
          },
        }}
      />
    </div>
  );
}
