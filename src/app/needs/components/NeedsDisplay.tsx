"use client";

// import Button from "@/ui/shared/Button";
import { useState, useEffect } from "react";
import { useDatabase } from "@/context/DatabaseContext";
import retrieveDataObject from "@/lib/utils/retrieveDataObject";
import { RxDocumentData } from "rxdb";
import { Insight } from "@/app/insights/components/InsightsDisplay";

export default function NeedsDisplay() {
  const database = useDatabase();
  const [categories, setCategories] = useState<RxDocumentData<Insight>[]>([]);
  //   const [needs, setNeeds] = useState([]);

  const fetchCategories = async () => {
    const response = await database.getFromDb("needs_categories");
    const data = retrieveDataObject(response);
    console.log(data);
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="w-11/12 m-auto">
        {categories.map((category, index) => {
          return (
            <div key={index}>
              <h2 className="text-xl mb-5 font-semibold">{category.name}</h2>
              <div className="flex gap-5 flex-wrap mb-10">
                {/* {needs.map((need, index) => {
                  return (
                    <Button
                    key={index}
                      label={need.name}
                      className="bg-gray-600 font-normal text-nowrap"
                      />
                  );
                })} */}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
