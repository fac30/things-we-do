"use client";

import Button from "@/ui/shared/Button";
import { useState, useEffect } from "react";
import { useDatabase } from "@/context/DatabaseContext";
import retrieveDataObject from "@/lib/utils/retrieveDataObject";
import { RxDocumentData } from "rxdb";
import NeedsSection from "./NeedsSection";

import Modal from "@/ui/shared/Modal";

// Define the types for the category and need data
interface Category {
  id: string;
  name: string;
}

interface Need {
  name: string;
  category: string; // Assuming category is a reference to the category ID
}

interface CategorizedNeed {
  category: string;
  needs: Need[];
}

export default function NeedsDisplay() {
  const database = useDatabase();
  const [categories, setCategories] = useState<RxDocumentData<Category>[]>([]);
  const [needs, setNeeds] = useState<RxDocumentData<Need>[]>([]);

  const fetchCategories = async () => {
    const response = await database.getFromDb("needs_categories");
    const categories = retrieveDataObject(response);
    console.log(categories);
    setCategories(categories);
  };

  const fetchNeeds = async () => {
    const response = await database.getFromDb("needs");
    const needs = retrieveDataObject(response);
    setNeeds(needs);
  };

  useEffect(() => {
    fetchCategories();
    fetchNeeds();
  }, []);

  const categorisedNeeds: CategorizedNeed[] = categories.map((category) => {
    const categoryNeeds = needs.filter((need) => need.category === category.id);
    return { category: category.name, needs: categoryNeeds };
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState(false);

  const handleOpen = (need) => {
    setModalOpen(true);
    setSelectedNeed(need);
  };

  return (
    <>
      <div className="w-11/12 m-auto">
        {categorisedNeeds.map((categoryData, index) => {
          return (
            <NeedsSection
              key={index}
              categoryData={categoryData}
              handleOpen={handleOpen}
            />
          );
        })}
      </div>
      <Modal
        modalOpen={modalOpen}
        forwardButton={{
          label: "Worth Doing",
          action: () => {
            setModalOpen(false);
            // router.push("/toolkit");
          },
        }}
        backButton={{
          label: "Not Worth Doing",
          action: () => {
            setModalOpen(false);
            // router.push("/toolkit");
          },
        }}
        title={`You have selected ${selectedNeed}. Select the button that best describes meeting this need right now.`}
      />
    </>
  );
}
