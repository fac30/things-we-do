"use client";

import Button from "@/ui/shared/Button";
import { useState, useEffect } from "react";

export default function NeedsDisplay() {
  const [categories, setCategories] = useState([]);
  const [needs, setNeeds] = useState([]);

  const getData = async () => {
    const response = await fetch("./mockNeeds.json");
    const data = await response.json();
    const { needs_categories, needs, next_actions } = data;
    setCategories(needs_categories);
    setNeeds(needs);
    console.log(data);
  };

  useEffect(() => {
    getData();
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
