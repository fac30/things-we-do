'use client'
import React, { useState } from "react";
import CategoryButton from "./CategoryButtons";

const categoryBarClass = `
  flex items-center gap-4 px-4 py-2 
  overflow-x-auto bg-[#1b192e] border-b 
  border-gray-700 sm:gap-6 sm:px-6`;

const CategoryBar: React.FC = () => {
  const categories = [
    'All',
    'Replace',
    'Distract',
    'Barrier',
    'Change status',
    'Category 6',
    'Category 7',
  ];

  const [activeCategory, setActiveCategory] = useState<string>('All');

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    console.log(`Category selected: ${category}`);
  };

  return (
    <div className={categoryBarClass}>
      {categories.map((category) => (
        <CategoryButton
          key={category}
          label={category}
          isActive={activeCategory === category}
          onClick={() => handleCategoryClick(category)}
        />
      ))}
    </div>
  );
};

export default CategoryBar;