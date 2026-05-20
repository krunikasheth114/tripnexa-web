import Image from "next/image";
import Link from "next/link";
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
    const heroImage = packageDetails.gallery?.[0]?.url ?? null;
    const price = packageDetails.discountPrice ?? packageDetails.price;
    const hasDiscount =
        packageDetails.discountPrice !== null &&
        packageDetails.discountPrice !== undefined &&
        packageDetails.discountPrice < packageDetails.price;
    const savings = hasDiscount ? packageDetails.price - (packageDetails.discountPrice ?? 0) : 0;

    const chips = buildChips(packageDetails.inclusions, packageDetails.exclusions);
    const inclChips = chips.filter((c) => c.included);
    const exclChips = chips.filter((c) => !c.included);

    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="relative h-[400px] md:h-[500px] overflow-hidden bg-gray-900">
                {heroImage && (
                    <Image
                        src={heroImage}
                        alt={packageDetails.title}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                )}
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
