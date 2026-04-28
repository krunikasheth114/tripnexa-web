"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchDestinations, type ApiDestination } from "@/services/destinations";

const VISIBLE = 7;

export default function CategoryFilter() {
  const [destinations, setDestinations] = useState<ApiDestination[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetchDestinations().then(setDestinations);
  }, []);

  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + VISIBLE < destinations.length;

  const goPrev = () => setStartIndex((i) => Math.max(i - 1, 0));
  const goNext = () =>
    setStartIndex((i) => Math.min(i + 1, destinations.length - VISIBLE));

  const visible = destinations.slice(startIndex, startIndex + VISIBLE);

  if (destinations.length === 0) return null;

  return (
    <div className="relative z-10 flex justify-center -mt-8 px-6">
      <div
        className="flex items-center bg-white rounded-[8px] shadow-xl px-4 py-3 max-w-3xl w-full transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Prev */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isHovered ? "w-9 mr-2" : "w-0 mr-0"
          }`}
        >
          <button
            type="button"
            onClick={goPrev}
            disabled={!canGoPrev}
            aria-label="Previous"
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-200 ${
              canGoPrev
                ? "border-gray-200 text-[#28536B] hover:bg-[#28536B] hover:text-white hover:border-[#28536B]"
                : "border-gray-100 text-gray-300 cursor-not-allowed"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>

        {/* Pills */}
        <div className="flex gap-2 flex-1">
          {visible.map((dest) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              className="flex-1 px-3 py-2 rounded-[8px] text-sm font-medium whitespace-nowrap text-center border border-gray-200 text-gray-600 hover:border-[#28536B] hover:text-[#28536B] transition-all duration-200"
            >
              {dest.name}
            </Link>
          ))}
        </div>

        {/* Next */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isHovered ? "w-9 ml-2" : "w-0 ml-0"
          }`}
        >
          <button
            type="button"
            onClick={goNext}
            disabled={!canGoNext}
            aria-label="Next"
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-200 ${
              canGoNext
                ? "border-gray-200 text-[#28536B] hover:bg-[#28536B] hover:text-white hover:border-[#28536B]"
                : "border-gray-100 text-gray-300 cursor-not-allowed"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
