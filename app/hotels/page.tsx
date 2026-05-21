import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchHotels } from "@/services/hotels";
import { fetchDestinations } from "@/services/destinations";
import { Suspense } from "react";
import HotelsListClient from "./_components/HotelsListClient";

export const metadata: Metadata = {
  title: "Hotels in Gujarat – TripNexa",
  description:
    "Browse handpicked hotels, resorts, and heritage stays across Gujarat. Filter by destination, star rating, and price.",
};

export default async function HotelsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;

  const params = {
    destinationId: sp.destinationId ? Number(sp.destinationId) : undefined,
    starRating: sp.starRating ? Number(sp.starRating) : undefined,
    minPrice: sp.minPrice ? Number(sp.minPrice) : undefined,
    maxPrice: sp.maxPrice ? Number(sp.maxPrice) : undefined,
    page: 1,
    limit: 9,
  };

  // Fetch initial data + destinations in parallel
  // fetchDestinations may return a paginated object or flat array depending on backend
  const [result, rawDestinations] = await Promise.all([
    fetchHotels(params),
    fetchDestinations(),
  ]);

  // Safely unwrap — if backend returned {data:[], total} instead of []
  const destinations = Array.isArray(rawDestinations)
    ? rawDestinations
    : ((rawDestinations as unknown as { data: typeof rawDestinations })?.data ?? []);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero banner */}
      <div className="bg-white border-b border-gray-100 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500 mb-2">
            Where to Stay
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] font-bold text-gray-900 text-4xl md:text-5xl">
            Hotels across Gujarat
          </h1>
          <p className="mt-3 text-gray-500 text-base max-w-xl">
            From luxury retreats to heritage boutiques — find the perfect stay for your trip.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Suspense fallback={
          <div className="flex items-center justify-center py-24">
            <svg className="animate-spin h-8 w-8 text-orange-400" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          </div>
        }>
          <HotelsListClient
            initialHotels={result.data}
            initialTotal={result.total}
            initialHasMore={result.hasMore}
            destinations={destinations.map((d) => ({ id: d.id, name: d.name }))}
            initialFilters={params}
          />
        </Suspense>
      </div>

      <Footer />
    </main>
  );
}
