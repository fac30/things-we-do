'use client'
import { useState } from "react";
import CategoriesBar from "@/app/toolkit/components/CategoriesBar";
import ToolList from "@/app/toolkit/components/ToolList";
import FloatingButton from "@/app/toolkit/components/floatingButton";
import { Header } from "@/ui/shared/Header";
import { ToolkitProvider } from "@/context/ToolkitContext";
import DatabaseManager from "@/lib/db/DatabaseManager";
import Modal from "@/ui/shared/Modal";

export default function ToolkitPage() {
  const [modalOpen, setModalOpen] = useState(false); // Manage modal visibility
  const [newCategory, setNewCategory] = useState(""); // Manage input value
  const [refreshCategories, setRefreshCategories] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value); // Update input value
  };

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        await DatabaseManager.addCategories(newCategory); // Add category to DB
        setNewCategory("");
        setModalOpen(false);
        setRefreshCategories((prev) => !prev); // Toggle state to trigger a refresh
      } catch (error) {
        console.error("Failed to add category:", error);
      }
    }
  };

  return (
    <ToolkitProvider>
      <div className="relative h-full">
        <Header
          title="Toolkit"
          description="add and search tools which help you in your daily life."
          hasInfoButton={true}
        />
        <CategoriesBar openModal={() => setModalOpen(true)} refreshCategories={refreshCategories}/>
        <div className="p-4">
          <ToolList />
        </div>
        <FloatingButton />

        {/* Modal Component */}
        <Modal
          inputModal={true}
          modalOpen={modalOpen}
          title="Add New Category"
          placeholder="Enter category name"
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
          handleInputChange={handleInputChange}
        />
      </div>
    </ToolkitProvider>
  );
}
