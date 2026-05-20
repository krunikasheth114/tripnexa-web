"use client";

import React, { useState } from "react";
import type { ApiPackage } from "@/services/destinations";

interface ItineryFilterProps {
  durationOptions: string[];
  budgetOptions: string[];
  packages: ApiPackage[];
}

const ItineryFilter = ({ durationOptions, budgetOptions }: ItineryFilterProps) => {
  const [activeDuration, setActiveDuration] = useState(0);
  const [activeBudget, setActiveBudget] = useState(0);

  return (
    <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">
        Filter Packages
      </p>
      <h3 className="mt-1 text-xl font-[family-name:var(--font-playfair)] font-bold text-gray-900">
        Refine your itinerary
      </h3>

      <hr className="my-5 border-gray-200" />

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Duration
        </p>
        <div className="space-y-2">
          {durationOptions.map((option, index) => (
            <button
              key={`dur-${index}`}
              type="button"
              onClick={() => setActiveDuration(index)}
              className={`w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors duration-200 ${
                activeDuration === index
                  ? "bg-orange-500 text-white"
                  : "border border-gray-200 text-gray-900 hover:border-orange-500 hover:text-orange-600"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <hr className="my-5 border-gray-200" />

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Budget
        </p>
        <div className="space-y-2">
          {budgetOptions.map((option, index) => (
            <button
              key={`bud-${index}`}
              type="button"
              onClick={() => setActiveBudget(index)}
              className={`w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors duration-200 ${
                activeBudget === index
                  ? "bg-orange-500 text-white"
                  : "border border-gray-200 text-gray-900 hover:border-orange-500 hover:text-orange-600"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => { setActiveDuration(0); setActiveBudget(0); }}
        className="mt-6 w-full rounded-xl border border-orange-400 px-4 py-2.5 text-sm font-semibold text-orange-500 transition-colors duration-200 hover:bg-orange-500 hover:text-white"
      >
        Reset Filters
      </button>
    </aside>
  );
};

export default ItineryFilter;
