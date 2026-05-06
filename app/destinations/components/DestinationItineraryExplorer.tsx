"use client";

import Image from "next/image";
import Link from "next/link";
import type { Destination, ItineraryPlan } from "@/services/destinations";

interface DestinationItineraryExplorerProps {
  destination: Destination;
  itineraries: ItineraryPlan[];
}

const budgetOptions = [
  "All Budgets",
  "Under Rs 10,000",
  "Rs 10,000 - Rs 15,000",
  "Above Rs 15,000",
];

function formatInr(value: number): string {
  return `INR ${value.toLocaleString("en-IN")}`;
}

function formatDurationAsNights(duration: string): string {
  const nightsMatch = duration.match(/(\d+)\s*N/i);
  if (!nightsMatch) {
    return duration;
  }

  const nights = Number(nightsMatch[1]);
  if (Number.isNaN(nights)) {
    return duration;
  }

  return `${nights} Night${nights === 1 ? "" : "s"}`;
}

export default function DestinationItineraryExplorer({
  destination,
  itineraries,
}: DestinationItineraryExplorerProps) {
  const durationOptions = [
    "All nights",
    ...Array.from(new Set(itineraries.map((itinerary) => itinerary.duration))).map(
      formatDurationAsNights
    ),
  ];

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="h-fit rounded-[16px] border border-[#E6E1DA] bg-white p-5 shadow-sm lg:sticky lg:top-24">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C2948A]">
          Filter Packages
        </p>
        <h3 className="mt-2 text-xl font-bold text-[#28536B]">
          Refine your itinerary
        </h3>

        <div className="mt-6">
          <p className="text-sm font-semibold text-[#28536B]">Duration</p>
          <div className="mt-3 space-y-2">
            {durationOptions.map((option, index) => (
              <button
                key={`${option}-${index}`}
                type="button"
                className={`w-full rounded-[10px] border px-3 py-2 text-left text-sm transition-colors duration-200 ${
                  index === 0
                    ? "border-[#28536B] bg-[#28536B] text-white"
                    : "border-gray-200 text-gray-700 hover:border-[#28536B] hover:text-[#28536B]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold text-[#28536B]">Budget</p>
          <div className="mt-3 space-y-2">
            {budgetOptions.map((option, index) => (
              <button
                key={option}
                type="button"
                className={`w-full rounded-[10px] border px-3 py-2 text-left text-sm transition-colors duration-200 ${
                  index === 0
                    ? "border-[#28536B] bg-[#28536B] text-white"
                    : "border-gray-200 text-gray-700 hover:border-[#28536B] hover:text-[#28536B]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="mt-6 w-full rounded-[10px] border border-[#C2948A] px-3 py-2 text-sm font-semibold text-[#C2948A] transition-colors duration-200 hover:bg-[#C2948A] hover:text-white"
        >
          Reset Filters
        </button>
      </aside>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 2xl:grid-cols-3">
        {itineraries.length > 0 ? (
          itineraries.map((itinerary) => {
            const originalPrice = itinerary.originalPricePerPerson;
            const hasDiscount =
              originalPrice !== undefined &&
              originalPrice > itinerary.pricePerPerson;
            const savings = hasDiscount
              ? originalPrice - itinerary.pricePerPerson
              : 0;

            return (
              <article
                key={itinerary.id}
                className="flex h-[33rem] flex-col overflow-hidden rounded-[8px] border border-[#E4E4E4] bg-[#FCFCFB] shadow-sm"
              >
                <div className="relative h-44">
                  <Image
                    src={destination.image}
                    alt={`${destination.name} ${itinerary.duration} plan`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/45" />
                  <span className="absolute left-3 top-3 rounded-full bg-[#F4DDB5] px-3 py-1 text-xs font-semibold text-[#3A2A0F]">
                    {itinerary.badge}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 min-h-[2.25rem] text-[0.96rem] leading-snug font-bold text-[#0A1E2A] md:text-[1rem]">
                        {destination.name} {itinerary.title}
                      </h3>
                      <p className="mt-1 text-sm text-[#0A1E2A]/80">
                        {itinerary.stay}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-[8px] border border-[#28536B]/50 px-2.5 py-1 text-sm font-semibold text-[#28536B]">
                      {itinerary.duration}
                    </span>
                  </div>

                  <hr className="my-2 border-[#E2E2E2]" />

                  <div className="my-4 h-[4.25rem] overflow-hidden">
                    <ul className="grid h-full list-disc grid-cols-1 content-start gap-y-3 pl-4 text-[0.92rem] leading-5 text-[#1E2E3A] marker:text-[#5B6C77] md:grid-cols-2 md:gap-x-4">
                      {itinerary.highlights.map((point) => (
                        <li key={point} className="">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-2 line-clamp-2 text-sm font-medium text-[#0A6D8A]">
                    {itinerary.specialNote}
                  </p>

                  <div className="my-2 flex min-h-[8.5rem] flex-col rounded-[8px] bg-[#F3F3F2] p-2">
                    {hasDiscount ? (
                      <div className="flex min-h-[2rem] items-center gap-2">
                        <span className="text-lg text-[#4A5C68] line-through">
                          {formatInr(originalPrice)}
                        </span>
                        <span className="line-clamp-1 rounded bg-[#EAF8EE] px-2 py-1 text-xs font-semibold uppercase tracking-wide text-[#1A8F4A]">
                          Save {formatInr(savings)}
                        </span>
                      </div>
                    ) : null}
                    <div className="mt-2 flex min-h-[2rem] items-end gap-2">
                      <span className="text-[1.2rem] leading-none font-bold text-[#0A1E2A]">
                        {formatInr(itinerary.pricePerPerson)}
                      </span>
                      <span className="text-[1.2rem] text-[#4A5C68]">/Adult</span>
                    </div>

                    <div className="mt-auto flex justify-end pt-4">
                      <Link
                        href={`/destinations/${destination.id}/book/${itinerary.id}`}
                        className="inline-flex items-center justify-center rounded-[10px] bg-[#28536B] px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1D4054]"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="xl:col-span-2 2xl:col-span-3 rounded-[16px] border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
            No packages found for this destination.
          </div>
        )}
      </div>
    </div>
  );
}
