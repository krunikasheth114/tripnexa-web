"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import type { ApiPackage } from "@/services/destinations";
import ItineraryTabs from "./ItineraryTabs";

// ── Mirrors the admin's OPTION_GROUPS + FLAT_OPTIONS ─────────────
const GROUPS: { key: string; label: string; icon: string; children: { key: string; label: string; icon: string }[] }[] = [
    {
        key: 'meals', label: 'Meals', icon: '🍽️',
        children: [
            { key: 'breakfast', label: 'Breakfast', icon: '🌅' },
            { key: 'lunch',     label: 'Lunch',     icon: '☀️' },
            { key: 'dinner',    label: 'Dinner',    icon: '🌙' },
        ],
    },
    {
        key: 'accommodation', label: 'Accommodation', icon: '🏨',
        children: [
            { key: '2-star', label: '2-Star Hotel', icon: '⭐⭐' },
            { key: '3-star', label: '3-Star Hotel', icon: '⭐⭐⭐' },
            { key: '4-star', label: '4-Star Hotel', icon: '⭐⭐⭐⭐' },
            { key: '5-star', label: '5-Star Hotel', icon: '⭐⭐⭐⭐⭐' },
        ],
    },
    {
        key: 'transport', label: 'Transfers & Transport', icon: '🚗',
        children: [
            { key: 'private-cab', label: 'Private Cab', icon: '🚙' },
            { key: 'ac-bus',      label: 'AC Bus',       icon: '🚌' },
            { key: 'volvo-bus',   label: 'Volvo Bus',    icon: '🚌' },
            { key: 'train',       label: 'Train',         icon: '🚆' },
            { key: 'flight',      label: 'Flight',        icon: '✈️' },
        ],
    },
];

const FLAT: { key: string; label: string; icon: string }[] = [
    { key: 'activities',       label: 'Activities & Sightseeing', icon: '🎯' },
    { key: 'entryFees',        label: 'Entry Fees & Permits',     icon: '🎟️' },
    { key: 'guide',            label: 'Professional Guide',       icon: '🧭' },
    { key: 'insurance',        label: 'Travel Insurance',         icon: '🛡️' },
];

interface Chip { label: string; included: boolean }

function buildChips(
    inc: Record<string, unknown> | null,
    exc: Record<string, unknown> | null,
): Chip[] {
    const chips: Chip[] = [];

    for (const g of GROUPS) {
        const incVal = inc?.[g.key];
        const excVal = exc?.[g.key];
        const hasAnyIncluded = Array.isArray(incVal) && incVal.length > 0;

        if (hasAnyIncluded) {
            // "🍽️ Meals (Breakfast)" or "🏨 Accommodation (3-Star Hotel)"
            const childLabels = (incVal as string[]).map((k) => {
                const c = g.children.find((ch) => ch.key === k);
                return c ? c.label : k;
            });
            chips.push({ label: `${g.icon} ${g.label} (${childLabels.join(', ')})`, included: true });
        } else if (Array.isArray(excVal) && excVal.length > 0) {
            // Whole group excluded — show parent name only
            chips.push({ label: `${g.icon} ${g.label}`, included: false });
        }
    }

    for (const opt of FLAT) {
        if (inc?.[opt.key] === true) {
            chips.push({ label: `${opt.icon} ${opt.label}`, included: true });
        } else if (exc?.[opt.key] === true) {
            chips.push({ label: `${opt.icon} ${opt.label}`, included: false });
        }
    }

    return chips;
}

interface PackageItineraryDetailsProps {
    packageDetails: ApiPackage;
}

export default function PackageItineraryDetails({ packageDetails }: PackageItineraryDetailsProps) {
    const itineraryDays = packageDetails.itineraries ?? [];
    const DUMMY_IMAGES = [
        { id: -1, url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&auto=format&fit=crop", position: 0 },
        { id: -2, url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&auto=format&fit=crop", position: 1 },
        { id: -3, url: "https://images.unsplash.com/photo-1609766857044-a5b38eea8f94?w=800&auto=format&fit=crop", position: 2 },
    ];
    const allImages = (packageDetails.gallery ?? []).length > 0 ? packageDetails.gallery ?? [] : DUMMY_IMAGES;
    const heroImage = allImages[0]?.url ?? null;
    const price = packageDetails.discountPrice ?? packageDetails.price;
    const hasDiscount =
        packageDetails.discountPrice !== null &&
        packageDetails.discountPrice !== undefined &&
        packageDetails.discountPrice < packageDetails.price;
    const savings = hasDiscount ? packageDetails.price - (packageDetails.discountPrice ?? 0) : 0;

    const chips = buildChips(packageDetails.inclusions, packageDetails.exclusions);
    const inclChips = chips.filter((c) => c.included);
    const exclChips = chips.filter((c) => !c.included);

    // ── Lightbox state ──────────────────────────────────────────────
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const openLightbox = useCallback((index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    }, []);

    const closeLightbox = useCallback(() => setLightboxOpen(false), []);

    const prevImage = useCallback(() => {
        setLightboxIndex((i) => (i - 1 + allImages.length) % allImages.length);
    }, [allImages.length]);

    const nextImage = useCallback(() => {
        setLightboxIndex((i) => (i + 1) % allImages.length);
    }, [allImages.length]);

    useEffect(() => {
        if (!lightboxOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "ArrowRight") nextImage();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [lightboxOpen, closeLightbox, prevImage, nextImage]);

    return (
        <div className="bg-white">
            {/* ── Hero: text row + mosaic ────────────────────────────── */}
            {allImages.length === 0 ? (
                /* Fallback: dark hero when no gallery images exist */
                <section className="relative h-[400px] md:h-[500px] overflow-hidden bg-gray-900">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/80" />
                    <div className="relative mx-auto flex h-full max-w-7xl flex-col items-start justify-end px-6 pb-14 gap-3">
                        <Link
                            href={`/destinations/${packageDetails.destinationId}`}
                            className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-300 transition hover:text-white"
                        >
                            ← Back to destination
                        </Link>
                        <h1 className="max-w-3xl text-3xl font-[family-name:var(--font-playfair)] font-bold text-white md:text-5xl">
                            {packageDetails.title}
                        </h1>
                        {packageDetails.description && (
                            <p className="max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
                                {packageDetails.description}
                            </p>
                        )}
                    </div>
                </section>
            ) : (
                <>
                    {/* Text row above mosaic */}
                    <div className="max-w-7xl mx-auto px-6 pt-10 pb-4">
                        <Link
                            href={`/destinations/${packageDetails.destinationId}`}
                            className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500 transition hover:text-orange-700"
                        >
                            ← Back to destination
                        </Link>
                        <h1 className="mt-3 max-w-3xl text-3xl font-[family-name:var(--font-playfair)] font-bold text-gray-900 md:text-5xl">
                            {packageDetails.title}
                        </h1>
                        {packageDetails.description && (
                            <p className="mt-2 max-w-2xl text-base leading-relaxed text-gray-500 md:text-lg">
                                {packageDetails.description}
                            </p>
                        )}
                    </div>

                    {/* Mosaic grid */}
                    <div className="max-w-7xl mx-auto px-6 pb-10">
                        <div className="relative h-[420px] md:h-[500px] rounded-2xl overflow-hidden">
                            {allImages.length === 1 && (
                                /* Single image: full width */
                                <button
                                    type="button"
                                    onClick={() => openLightbox(0)}
                                    className="group relative block w-full h-full rounded-2xl overflow-hidden"
                                    aria-label="Open photo gallery"
                                >
                                    <Image
                                        src={allImages[0].url}
                                        alt={`${packageDetails.title} — photo 1`}
                                        fill
                                        priority
                                        sizes="(max-width: 1280px) 100vw, 1280px"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </button>
                            )}

                            {allImages.length === 2 && (
                                /* Two images: equal columns */
                                <div className="flex gap-2 h-full">
                                    {allImages.slice(0, 2).map((img, idx) => (
                                        <button
                                            key={img.id}
                                            type="button"
                                            onClick={() => openLightbox(idx)}
                                            className="group relative flex-1 overflow-hidden rounded-2xl"
                                            aria-label={`Open photo ${idx + 1}`}
                                        >
                                            <Image
                                                src={img.url}
                                                alt={`${packageDetails.title} — photo ${idx + 1}`}
                                                fill
                                                priority={idx === 0}
                                                sizes="(max-width: 1280px) 50vw, 640px"
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {allImages.length >= 3 && (
                                /* Three or more: 2/3 left + 1/3 right stacked */
                                <div className="flex gap-2 h-full">
                                    {/* Main left image */}
                                    <button
                                        type="button"
                                        onClick={() => openLightbox(0)}
                                        className="group relative overflow-hidden rounded-tl-2xl rounded-bl-2xl"
                                        style={{ flex: "2 1 0%" }}
                                        aria-label="Open photo 1"
                                    >
                                        <Image
                                            src={allImages[0].url}
                                            alt={`${packageDetails.title} — photo 1`}
                                            fill
                                            priority
                                            sizes="(max-width: 1280px) 67vw, 853px"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </button>

                                    {/* Right column: two stacked images */}
                                    <div className="flex flex-col gap-2" style={{ flex: "1 1 0%" }}>
                                        <button
                                            type="button"
                                            onClick={() => openLightbox(1)}
                                            className="group relative flex-1 overflow-hidden rounded-tr-2xl"
                                            aria-label="Open photo 2"
                                        >
                                            <Image
                                                src={allImages[1].url}
                                                alt={`${packageDetails.title} — photo 2`}
                                                fill
                                                sizes="(max-width: 1280px) 33vw, 427px"
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => openLightbox(2)}
                                            className="group relative flex-1 overflow-hidden rounded-br-2xl"
                                            aria-label="Open photo 3"
                                        >
                                            <Image
                                                src={allImages[2].url}
                                                alt={`${packageDetails.title} — photo 3`}
                                                fill
                                                sizes="(max-width: 1280px) 33vw, 427px"
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* "View all photos" pill button */}
                            <button
                                type="button"
                                onClick={() => openLightbox(0)}
                                className="absolute bottom-4 right-4 flex items-center gap-2 rounded-[8px] bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-md transition-shadow hover:shadow-lg"
                                aria-label={`View all ${allImages.length} photos`}
                            >
                                {/* Camera icon (inline SVG — no extra package) */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                    <circle cx="12" cy="13" r="4" />
                                </svg>
                                View all {allImages.length} photos
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* ── Lightbox ───────────────────────────────────────────── */}
            {lightboxOpen && allImages.length > 0 && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Photo gallery lightbox"
                >
                    {/* Close button */}
                    <button
                        type="button"
                        onClick={closeLightbox}
                        className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-[8px] bg-white/10 text-white transition-colors hover:bg-white/20"
                        aria-label="Close gallery"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {/* Index indicator */}
                    <span className="absolute top-5 left-1/2 -translate-x-1/2 text-sm font-semibold text-white/80 tabular-nums">
                        {lightboxIndex + 1} / {allImages.length}
                    </span>

                    {/* Previous button */}
                    {allImages.length > 1 && (
                        <button
                            type="button"
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-[8px] bg-white/10 text-white transition-colors hover:bg-white/20"
                            aria-label="Previous photo"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                    )}

                    {/* Current image */}
                    <div className="relative mx-auto h-[80vh] w-full max-w-5xl px-16">
                        <Image
                            src={allImages[lightboxIndex].url}
                            alt={`${packageDetails.title} — photo ${lightboxIndex + 1}`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 1024px"
                            className="object-contain"
                        />
                    </div>

                    {/* Next button */}
                    {allImages.length > 1 && (
                        <button
                            type="button"
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-[8px] bg-white/10 text-white transition-colors hover:bg-white/20"
                            aria-label="Next photo"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    )}
                </div>
            )}

            {/* Main content */}
            <section className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1fr_340px]">
                {/* Left column */}
                <div className="space-y-10">
                    {/* Stat cards */}
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-gray-200 bg-white p-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Duration</p>
                            <p className="mt-2 font-[family-name:var(--font-playfair)] text-2xl font-bold text-gray-900">
                                {packageDetails.days} Days · {packageDetails.nights} Nights
                            </p>
                        </div>
                        {/* Accommodation from inclusions JSON */}
                        {(() => {
                            const acc = packageDetails.inclusions?.accommodation;
                            if (!Array.isArray(acc) || acc.length === 0) return null;
                            const g = GROUPS.find((g) => g.key === 'accommodation')!;
                            const labels = acc.map((k) => {
                                const c = g.children.find((ch) => ch.key === k);
                                return c ? c.label : k;
                            });
                            return (
                                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Accommodation</p>
                                    <p className="mt-2 font-[family-name:var(--font-playfair)] text-lg font-bold text-gray-900">
                                        {labels.join(', ')}
                                    </p>
                                </div>
                            );
                        })()}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Starting From</p>
                            <p className="mt-2 font-[family-name:var(--font-playfair)] text-2xl font-bold text-orange-600">
                                ₹{price.toLocaleString()} / Adult
                            </p>
                        </div>
                    </div>

                    {/* Tabbed itinerary */}
                    <div>
                        <h2 className="mb-6 font-[family-name:var(--font-playfair)] text-2xl font-bold text-gray-900 md:text-3xl">
                            Day-wise Itinerary
                        </h2>
                        <ItineraryTabs days={itineraryDays} />
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-7 shadow-lg lg:sticky lg:top-24 space-y-5">
                    <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-gray-900">
                        Package Summary
                    </h2>

                    <hr className="border-gray-200" />

                    {/* Price */}
                    <div>
                        <div className="flex items-end gap-1.5">
                            <span className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-orange-600">
                                ₹{price.toLocaleString()}
                            </span>
                            <span className="mb-1 text-sm text-gray-500">/ Adult</span>
                        </div>
                        {hasDiscount && (
                            <div className="mt-2 flex items-center gap-2">
                                <span className="text-sm text-gray-500 line-through">
                                    ₹{packageDetails.price.toLocaleString()}
                                </span>
                                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                                    Save ₹{savings.toLocaleString()}
                                </span>
                            </div>
                        )}
                    </div>

                    <hr className="border-gray-200" />

                    {/* Tags */}
                    {packageDetails.tags?.length > 0 && (
                        <div>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Highlights</p>
                            <div className="flex flex-wrap gap-2">
                                {packageDetails.tags.map((tag) => (
                                    <span key={tag} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-900">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Inclusions & Exclusions */}
                    {chips.length > 0 && (
                        <div className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                                What&apos;s Included / Not Included
                            </p>
                            <ul className="space-y-1.5">
                                {inclChips.map((c, i) => (
                                    <li key={i} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] text-emerald-600">✓</span>
                                        {c.label}
                                    </li>
                                ))}
                                {exclChips.map((c, i) => (
                                    <li key={i} className="flex items-center gap-2 text-xs text-gray-400">
                                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[10px] text-gray-400">✕</span>
                                        {c.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <Link
                        href={`/destinations/${packageDetails.destinationId}/book/${packageDetails.id}`}
                        className="block w-full rounded-full bg-orange-500 px-6 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-orange-600"
                    >
                        Continue Booking
                    </Link>
                </aside>
            </section>
        </div>
    );
}
