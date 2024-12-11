"use client";

import Button from "@/ui/shared/Button";
import { useState, useEffect } from "react";
import { useDatabase } from "@/context/DatabaseContext";
import retrieveDataObject from "@/lib/utils/retrieveDataObject";
import { RxDocumentData } from "rxdb";

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

  // Organize needs by category and store them in an array
  const categorisedNeeds: CategorizedNeed[] = categories.map((category) => {
    const categoryNeeds = needs.filter((need) => need.category === category.id);
    return { category: category.name, needs: categoryNeeds };
  });

  console.log(categorisedNeeds);

  return (
    <>
      <div className="w-11/12 m-auto">
        {categorisedNeeds.map((categoryData, index) => {
          const categoryNeeds = categoryData.needs;

          return (
            <div key={index}>
              <h2 className="text-xl mb-5 font-semibold">
                {categoryData.category}
              </h2>
              <div className="flex gap-5 flex-wrap mb-10">
                {categoryNeeds.map((need, needIndex) => {
                  return (
                    <Button
                      key={needIndex}
                      label={need.name}
                      className="bg-gray-600 font-normal text-nowrap"
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
