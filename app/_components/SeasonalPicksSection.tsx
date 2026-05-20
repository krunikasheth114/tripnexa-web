"use client";

import { useState } from "react";
import Image from "next/image";

interface SeasonalDestination {
  id: string;
  name: string;
  label: string;
  image: string;
  placeholderColor: string;
  days?: string;
  price?: string;
}

const SEASONAL_DESTINATIONS: SeasonalDestination[] = [
  {
    id: "manali",
    name: "Manali",
    label: "Summer Escape",
    image: "/seasonal/manali.jpg",
    placeholderColor: "#374151",
    days: "5 Days",
    price: "12,999",
  },
  {
    id: "coorg",
    name: "Coorg",
    label: "Hill Retreat",
    image: "/seasonal/coorg.jpg",
    placeholderColor: "#3a6b4a",
    days: "3 Days",
    price: "8,499",
  },
  {
    id: "rishikesh",
    name: "Rishikesh",
    label: "Adventure Hub",
    image: "/seasonal/rishikesh.jpg",
    placeholderColor: "#5a6b3a",
    days: "4 Days",
    price: "9,999",
  },
  {
    id: "darjeeling",
    name: "Darjeeling",
    label: "Tea & Mist",
    image: "/seasonal/darjeeling.jpg",
    placeholderColor: "#4a5a6b",
  },
  {
    id: "ladakh",
    name: "Ladakh",
    label: "High Desert",
    image: "/seasonal/ladakh.jpg",
    placeholderColor: "#6b5a3a",
  },
  {
    id: "kashmir",
    name: "Kashmir",
    label: "Paradise Valley",
    image: "/seasonal/kashmir.jpg",
    placeholderColor: "#4a6b5a",
  },
  {
    id: "goa",
    name: "Goa",
    label: "Coastal Bliss",
    image: "/seasonal/goa.jpg",
    placeholderColor: "#2a6b5a",
  },
  {
    id: "shimla",
    name: "Shimla",
    label: "Colonial Charm",
    image: "/seasonal/shimla.jpg",
    placeholderColor: "#5a4a6b",
  },
];

function FeaturedCard({ destination }: { destination: SeasonalDestination }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl cursor-pointer group h-[340px] w-full md:w-[500px] shrink-0">
      <div
        className="absolute inset-0"
        style={{ backgroundColor: destination.placeholderColor }}
      />
      {!imgError && (
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 500px"
          onError={() => setImgError(true)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      {/* Featured badge */}
      <span className="absolute top-4 left-4 bg-orange-200 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
        Featured
      </span>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-orange-200 text-xs font-semibold uppercase tracking-[0.15em] mb-1">
          {destination.label}
        </p>
        <h3 className="text-white text-2xl font-[family-name:var(--font-playfair)] font-bold">
          {destination.name}
        </h3>
        {destination.days && destination.price && (
          <p className="text-white/65 text-sm mt-1">
            {destination.days} &middot; From &#8377;{destination.price}
          </p>
        )}
      </div>
    </div>
  );
}

function SmallCard({ destination }: { destination: SeasonalDestination }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl cursor-pointer group flex-1 h-[340px]">
      <div
        className="absolute inset-0"
        style={{ backgroundColor: destination.placeholderColor }}
      />
      {!imgError && (
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 25vw"
          onError={() => setImgError(true)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-orange-200 text-xs font-semibold uppercase tracking-[0.15em] mb-1">
          {destination.label}
        </p>
        <h3 className="text-white text-lg font-[family-name:var(--font-playfair)] font-bold">
          {destination.name}
        </h3>
        {destination.days && destination.price && (
          <p className="text-white/65 text-xs mt-1">
            {destination.days} &middot; From &#8377;{destination.price}
          </p>
        )}
      </div>
    </div>
  );
}

export default function SeasonalPicksSection() {
  const [featured, card1, card2] = SEASONAL_DESTINATIONS;

  return (
    <section className="bg-white px-6 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header row */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500 mb-2">
              Seasonal Picks
            </p>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-gray-900">
              Summer&apos;s Best Destinations
            </h2>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-orange-400 hover:text-orange-600 transition-colors"
          >
            View All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Cards row — desktop */}
        <div className="hidden md:flex gap-5">
          <FeaturedCard destination={featured} />
          <SmallCard destination={card1} />
          <SmallCard destination={card2} />
        </div>

        {/* Cards — mobile stack */}
        <div className="flex flex-col gap-4 md:hidden">
          {[featured, card1, card2].map((dest) => (
            <div
              key={dest.id}
              className="relative h-56 overflow-hidden rounded-2xl cursor-pointer group"
            >
              <MobileCard destination={dest} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileCard({ destination }: { destination: SeasonalDestination }) {
  const [imgError, setImgError] = useState(false);

  return (
    <>
      <div
        className="absolute inset-0"
        style={{ backgroundColor: destination.placeholderColor }}
      />
      {!imgError && (
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="100vw"
          onError={() => setImgError(true)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-orange-200 text-xs font-semibold uppercase tracking-[0.12em] mb-0.5">
          {destination.label}
        </p>
        <h3 className="text-white text-lg font-[family-name:var(--font-playfair)] font-bold">
          {destination.name}
        </h3>
      </div>
    </>
  );
}
