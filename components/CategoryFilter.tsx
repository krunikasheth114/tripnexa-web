"use client";

import { categories } from "@/utils/mockData";

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {

  return (
    <div className="relative z-10 flex justify-center -mt-8 px-6">
      <div className="bg-white rounded-[8px] shadow-xl px-6 py-3 flex gap-2 overflow-x-auto scrollbar-hide max-w-full">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-5 py-2 rounded-[8px] text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              activeCategory === category
                ? "bg-[#28536B] text-white"
                : "border border-gray-200 text-gray-600 hover:border-[#28536B] hover:text-[#28536B]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
