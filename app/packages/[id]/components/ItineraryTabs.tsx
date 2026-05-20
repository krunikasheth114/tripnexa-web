"use client";

import { useState } from "react";
import Image from "next/image";
import type { ApiItineraryDay } from "@/services/destinations";

// ── Label maps ──────────────────────────────────────────────────
const MEAL_LABELS: Record<string, { label: string; emoji: string }> = {
    BREAKFAST: { label: "Breakfast", emoji: "🌅" },
    LUNCH:     { label: "Lunch",     emoji: "☀️" },
    DINNER:    { label: "Dinner",    emoji: "🌙" },
};

const ACTIVITY_LABELS: Record<string, string> = {
    SIGHTSEEING: "🏛️ Sightseeing",
    ADVENTURE:   "🧗 Adventure",
    TREKKING:    "🥾 Trekking",
    WATERSPORT:  "🏄 Watersport",
    RELAXATION:  "🧘 Relaxation",
    CAMPFIRE:    "🔥 Campfire",
    SHOPPING:    "🛍️ Shopping",
    BOATING:     "⛵ Boating",
    SAFARI:      "🦁 Safari",
};

const TRANSFER_LABELS: Record<string, string> = {
    AIRPORT_PICKUP:  "✈️ Airport Pickup",
    AIRPORT_DROP:    "✈️ Airport Drop",
    HOTEL_TRANSFER:  "🚗 Hotel Transfer",
    INTER_CITY:      "🚌 Inter-City",
    LOCAL_TRANSFER:  "🚙 Local Transfer",
    TRAIN_PICKUP:    "🚉 Train Pickup",
    TRAIN_DROP:      "🚉 Train Drop",
    OTHER:           "🚗 Transfer",
};

// ── Shared day header ────────────────────────────────────────────
function DayBadge({ dayNumber, dayTitle }: { dayNumber: number; dayTitle: string | null }) {
    return (
        <div className="flex items-center gap-3 mb-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                {String(dayNumber).padStart(2, "0")}
            </div>
            <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold text-gray-900">
                {dayTitle ?? `Day ${dayNumber}`}
            </h3>
        </div>
    );
}

// ── Destination group header ─────────────────────────────────────
function DestinationHeader({ name }: { name: string }) {
    return (
        <div className="flex items-center gap-3 my-4 first:mt-0">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="shrink-0 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                📍 {name}
            </span>
            <div className="h-px flex-1 bg-gray-200" />
        </div>
    );
}

// ── Tab 1: Full itinerary ────────────────────────────────────────
function ItineraryTab({ days }: { days: ApiItineraryDay[] }) {
    // Multi-dest: any day has a specific child destination set (parentId is not null)
    const isMultiDest = days.some((d) => d.destinationId !== null && d.destination !== null);

    // Group days by destination if multi-destination package
    type DayGroup = { destName: string | null; days: (typeof days) };
    const groups: DayGroup[] = [];
    if (isMultiDest) {
        let lastDestId: number | null = null;
        for (const day of days) {
            const destId = day.destinationId;
            if (destId !== lastDestId) {
                groups.push({ destName: day.destination?.name ?? null, days: [day] });
                lastDestId = destId;
            } else {
                groups[groups.length - 1].days.push(day);
            }
        }
    } else {
        groups.push({ destName: null, days });
    }

    return (
        <div className="space-y-2">
            {groups.map((group, gi) => (
                <div key={gi}>
                    {group.destName && <DestinationHeader name={group.destName} />}
                    {group.days.map((day, index) => {
                const heroImg = day.gallery?.[0]?.url ?? null;
                return (
                    <article key={day.id} className="flex gap-5">
                        {/* connector */}
                        <div className="flex shrink-0 flex-col items-center gap-1">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                                {String(day.dayNumber).padStart(2, "0")}
                            </div>
                            {index < group.days.length - 1 && (
                                <div className="w-px flex-1 bg-gray-200 min-h-[20px]" />
                            )}
                        </div>

                        <div className="mb-4 flex-1 rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">
                            {heroImg && (
                                <div className="relative h-44 w-full overflow-hidden">
                                    <Image
                                        src={heroImg}
                                        alt={day.dayTitle ?? `Day ${day.dayNumber}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 60vw"
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>
                            )}
                            <div className="p-5 space-y-4">
                                <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold text-gray-900">
                                    {day.dayTitle ?? `Day ${day.dayNumber}`}
                                </h3>
                                {day.description && (
                                    <p className="text-sm leading-relaxed text-gray-500">{day.description}</p>
                                )}

                                {day.meals?.length > 0 && (
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Meals</p>
                                        <div className="flex flex-wrap gap-2">
                                            {day.meals.map((m, i) => {
                                                const info = MEAL_LABELS[m.mealType] ?? { label: m.mealType, emoji: "🍴" };
                                                return (
                                                    <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-medium text-amber-800">
                                                        {info.emoji} {info.label}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {day.activities?.length > 0 && (
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Activities</p>
                                        <div className="flex flex-wrap gap-2">
                                            {day.activities.map((a, i) => (
                                                <span key={i} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600">
                                                    {a.title || ACTIVITY_LABELS[a.activityType] || a.activityType}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {day.transfers?.length > 0 && (
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Transfers</p>
                                        <div className="space-y-1.5">
                                            {day.transfers.map((t, i) => {
                                                const route = [t.pickupLocation, t.dropLocation].filter(Boolean).join(" → ");
                                                return (
                                                    <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                                                        <span className="font-medium">{TRANSFER_LABELS[t.transferType] ?? t.transferType}</span>
                                                        {route && <span className="text-gray-400">· {route}</span>}
                                                        {t.notes && <span className="text-gray-400">· {t.notes}</span>}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {day.hotels?.length > 0 && (
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Stay</p>
                                        <div className="flex flex-wrap gap-2">
                                            {day.hotels.map((h, i) => (
                                                <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-medium text-blue-800">
                                                    🏨 {h.hotel.name}{h.hotel.starRating ? ` · ${"★".repeat(h.hotel.starRating)}` : ""}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </article>
                );
            })}
                </div>
            ))}
        </div>
    );
}

// ── Tab 2: Hotels per day ────────────────────────────────────────
function HotelsTab({ days }: { days: ApiItineraryDay[] }) {
    const daysWithHotels = days.filter((d) => d.hotels?.length > 0);

    if (daysWithHotels.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-gray-200 p-10 text-center text-gray-400">
                No hotel details available for this package.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {daysWithHotels.map((day) => (
                <div key={day.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <DayBadge dayNumber={day.dayNumber} dayTitle={day.dayTitle} />
                    <div className="grid gap-3 sm:grid-cols-2">
                        {day.hotels.map((h, i) => (
                            <div key={i} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-xl">
                                    🏨
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">{h.hotel.name}</p>
                                    {h.hotel.city && (
                                        <p className="text-xs text-gray-500 mt-0.5">{h.hotel.city}</p>
                                    )}
                                    {h.hotel.starRating && (
                                        <p className="text-xs text-amber-500 mt-1">
                                            {"★".repeat(h.hotel.starRating)}{"☆".repeat(5 - h.hotel.starRating)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

// ── Tab 3: Activities per day ────────────────────────────────────
function ActivitiesTab({ days }: { days: ApiItineraryDay[] }) {
    const daysWithActivities = days.filter((d) => d.activities?.length > 0);

    if (daysWithActivities.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-gray-200 p-10 text-center text-gray-400">
                No activity details available for this package.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {daysWithActivities.map((day) => (
                <div key={day.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <DayBadge dayNumber={day.dayNumber} dayTitle={day.dayTitle} />
                    <div className="grid gap-3 sm:grid-cols-2">
                        {day.activities.map((a, i) => {
                            const typeLabel = ACTIVITY_LABELS[a.activityType] ?? a.activityType;
                            return (
                                <div key={i} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-xl">
                                        {/^\p{Emoji}/u.test(typeLabel) ? typeLabel.split(" ")[0] : "📍"}
                                    </div>
                                    <div>
                                        {a.title ? (
                                            <>
                                                <p className="font-semibold text-gray-900 text-sm">{a.title}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{typeLabel.replace(/^\S+\s/, "")}</p>
                                            </>
                                        ) : (
                                            <p className="font-semibold text-gray-900 text-sm">{typeLabel.replace(/^\S+\s/, "")}</p>
                                        )}
                                        {a.description && (
                                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{a.description}</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}

// ── Main tabs component ──────────────────────────────────────────
const TABS = [
    { key: "itinerary", label: "Itinerary" },
    { key: "hotels",    label: "Hotels" },
    { key: "activities",label: "Activities" },
] as const;

type TabKey = typeof TABS[number]["key"];

export default function ItineraryTabs({ days }: { days: ApiItineraryDay[] }) {
    const [active, setActive] = useState<TabKey>("itinerary");

    if (days.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-gray-200 p-10 text-center text-gray-400">
                Detailed itinerary will be shared upon booking.
            </div>
        );
    }

    return (
        <div>
            {/* Tab bar */}
            <div className="flex gap-1 rounded-xl bg-gray-100 p-1 mb-8 w-fit">
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActive(tab.key)}
                        className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                            active === tab.key
                                ? "bg-white text-orange-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-800"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            {active === "itinerary"  && <ItineraryTab  days={days} />}
            {active === "hotels"     && <HotelsTab     days={days} />}
            {active === "activities" && <ActivitiesTab days={days} />}
        </div>
    );
}
