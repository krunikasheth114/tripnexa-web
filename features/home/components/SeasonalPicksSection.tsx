"use client";

import { useState } from "react";
import Image from "next/image";

interface SeasonalDestination {
  id: string;
  name: string;
  label: string;
  image: string;
  placeholderColor: string;
}

const SEASONAL_DESTINATIONS: SeasonalDestination[] = [
  {
    id: "manali",
    name: "Manali",
    label: "Summer Escape",
    image: "/seasonal/manali.jpg",
    placeholderColor: "#28536B",
  },
  {
    id: "coorg",
    name: "Coorg",
    label: "Hill Retreat",
    image: "/seasonal/coorg.jpg",
    placeholderColor: "#3a6b4a",
  },
  {
    id: "rishikesh",
    name: "Rishikesh",
    label: "Adventure Hub",
    image: "/seasonal/rishikesh.jpg",
    placeholderColor: "#5a6b3a",
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
    <div className="group relative overflow-hidden rounded-[8px] cursor-pointer hover:scale-[1.02] hover:shadow-xl transition-all duration-300 row-span-3">
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
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
          onError={() => setImgError(true)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <div className="absolute top-4 left-4">
        <span className="bg-[#C2948A] text-white text-xs font-semibold px-3 py-1.5 rounded-[8px] uppercase tracking-wide">
          Summer Pick
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-[#C2948A] text-sm font-semibold uppercase tracking-widest mb-1">
          {destination.label}
        </p>
        <h3 className="text-white text-3xl font-bold">{destination.name}</h3>
        <p className="text-gray-300 text-sm mt-2 leading-relaxed">
          Escape the heat in the cool mountain valleys of Himachal Pradesh
        </p>
        <button
          type="button"
          className="mt-4 bg-white text-[#28536B] px-5 py-2.5 rounded-[8px] text-sm font-semibold hover:bg-[#28536B] hover:text-white transition-colors duration-200"
        >
          Explore Now
        </button>
      </div>
    </div>
  );
}

function SmallCard({
  destination,
  rowSpan = 1,
}: {
  destination: SeasonalDestination;
  rowSpan?: number;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden rounded-[8px] cursor-pointer hover:scale-[1.02] hover:shadow-lg transition-all duration-300 ${
        rowSpan === 2 ? "row-span-2" : "row-span-1"
      }`}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{ backgroundColor: destination.placeholderColor }}
      />
      {!imgError && (
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          unoptimized
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 25vw"
          onError={() => setImgError(true)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className="text-white text-sm font-bold">{destination.name}</h3>
      </div>
    </div>
  );
}

export default function SeasonalPicksSection() {
  const [featured, coorg, rishikesh, darjeeling, ladakh, kashmir, goa, shimla] =
    SEASONAL_DESTINATIONS;

  return (
    <section className="bg-[#F5F0EB] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#C2948A]">
            Seasonal Picks
          </p>
          <h2 className="text-3xl font-bold text-[#28536B] md:text-5xl">
            Summer&apos;s Best Destinations
          </h2>
          <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            Handpicked escapes across India for the perfect summer getaway
          </p>
        </div>

        <div
          className="hidden md:grid gap-3"
          style={{
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gridTemplateRows: "repeat(3, 180px)",
          }}
        >
          <FeaturedCard destination={featured} />
          <SmallCard destination={coorg} rowSpan={1} />
          <SmallCard destination={rishikesh} rowSpan={1} />
          <SmallCard destination={darjeeling} rowSpan={1} />
          <SmallCard destination={ladakh} rowSpan={2} />
          <SmallCard destination={kashmir} rowSpan={1} />
          <SmallCard destination={goa} rowSpan={2} />
          <SmallCard destination={shimla} rowSpan={1} />
        </div>

        <div className="grid grid-cols-1 gap-3 md:hidden">
          {SEASONAL_DESTINATIONS.map((destination) => (
            <div
              key={destination.id}
              className="group relative h-48 overflow-hidden rounded-[8px] cursor-pointer hover:scale-[1.02] hover:shadow-lg transition-all duration-300"
            >
              <MobileCard destination={destination} />
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
        className="absolute inset-0 opacity-80"
        style={{ backgroundColor: destination.placeholderColor }}
      />
      {!imgError && (
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          unoptimized
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="100vw"
          onError={() => setImgError(true)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white text-lg font-bold">{destination.name}</h3>
        <p className="text-gray-300 text-xs mt-0.5">{destination.label}</p>
      </div>
    </>
  );
}
