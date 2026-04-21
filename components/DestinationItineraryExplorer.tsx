"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Destination, ItineraryPlan } from "@/utils/mockData";

interface DestinationItineraryExplorerProps {
  destination: Destination;
  itineraries: ItineraryPlan[];
}

const budgetOptions = [
  { id: "all", label: "All Budgets" },
  { id: "budget", label: "Under Rs 10,000" },
  { id: "value", label: "Rs 10,000 - Rs 15,000" },
  { id: "premium", label: "Above Rs 15,000" },
] as const;

type BudgetFilter = (typeof budgetOptions)[number]["id"];

function formatInr(value: number): string {
  return `INR ${value.toLocaleString("en-IN")}`;
}

function budgetMatches(pricePerPerson: number, filter: BudgetFilter): boolean {
  if (filter === "all") {
    return true;
  }
  if (filter === "budget") {
    return pricePerPerson < 10000;
  }
  if (filter === "value") {
    return pricePerPerson >= 10000 && pricePerPerson <= 15000;
  }
  return pricePerPerson > 15000;
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
  const [durationFilter, setDurationFilter] = useState<string>("all");
  const [budgetFilter, setBudgetFilter] = useState<BudgetFilter>("all");

  const durationOptions = useMemo(
    () => ["all", ...itineraries.map((itinerary) => itinerary.duration)],
    [itineraries]
  );

  const filteredItineraries = useMemo(
    () =>
      itineraries.filter((itinerary) => {
        const matchesDuration =
          durationFilter === "all" || itinerary.duration === durationFilter;
        const matchesBudget = budgetMatches(itinerary.pricePerPerson, budgetFilter);
        return matchesDuration && matchesBudget;
      }),
    [budgetFilter, durationFilter, itineraries]
  );

  const resetFilters = () => {
    setDurationFilter("all");
    setBudgetFilter("all");
  };

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
            {durationOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setDurationFilter(option)}
                className={`w-full rounded-[10px] border px-3 py-2 text-left text-sm transition-colors duration-200 ${
                  durationFilter === option
                    ? "border-[#28536B] bg-[#28536B] text-white"
                    : "border-gray-200 text-gray-700 hover:border-[#28536B] hover:text-[#28536B]"
                }`}
              >
                {option === "all" ? "All nights" : formatDurationAsNights(option)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold text-[#28536B]">Budget</p>
          <div className="mt-3 space-y-2">
            {budgetOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setBudgetFilter(option.id)}
                className={`w-full rounded-[10px] border px-3 py-2 text-left text-sm transition-colors duration-200 ${
                  budgetFilter === option.id
                    ? "border-[#28536B] bg-[#28536B] text-white"
                    : "border-gray-200 text-gray-700 hover:border-[#28536B] hover:text-[#28536B]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="mt-6 w-full rounded-[10px] border border-[#C2948A] px-3 py-2 text-sm font-semibold text-[#C2948A] transition-colors duration-200 hover:bg-[#C2948A] hover:text-white"
        >
          Reset Filters
        </button>
      </aside>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 2xl:grid-cols-3">
        {filteredItineraries.length > 0 ? (
          filteredItineraries.map((itinerary) => (
            (() => {
              const oldPricePerPerson = Math.round(itinerary.pricePerPerson * 1.25);
              const savings = oldPricePerPerson - itinerary.pricePerPerson;

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
                  <div className="flex min-h-[2rem] items-center gap-2">
                    <span className="text-lg text-[#4A5C68] line-through">
                      {formatInr(oldPricePerPerson)}
                    </span>
                    <span className="line-clamp-1 rounded bg-[#EAF8EE] px-2 py-1 text-xs font-semibold uppercase tracking-wide text-[#1A8F4A]">
                      Save {formatInr(savings)}
                    </span>
                  </div>
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
            })()
          ))
        ) : (
          <div className="xl:col-span-2 2xl:col-span-3 rounded-[16px] border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
            No packages found with the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}
