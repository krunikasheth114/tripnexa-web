import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchDestinationsList } from "@/services/destinations";
import { Suspense } from "react";
import DestinationsListClient from "./_components/DestinationsListClient";

export const metadata: Metadata = {
  title: "Explore Destinations – TripNexa Gujarat",
  description:
    "Discover all the amazing destinations across Gujarat — from wildlife sanctuaries to heritage cities and sacred pilgrimages.",
};

export default async function DestinationsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;

  const params = {
    type: sp.type || undefined,
    search: sp.search || undefined,
    page: 1,
    limit: 12,
  };

  const result = await fetchDestinationsList(params);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero banner */}
      <div className="bg-white border-b border-gray-100 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500 mb-2">
            Gujarat&apos;s Finest
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] font-bold text-gray-900 text-4xl md:text-5xl">
            Explore Destinations
          </h1>
          <p className="mt-3 text-gray-500 text-base max-w-xl">
            From the white salt deserts of Kutch to the sacred shores of Somnath — every corner of Gujarat has a story.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-24">
              <svg
                className="animate-spin h-8 w-8 text-orange-400"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            </div>
          }
        >
          <DestinationsListClient
            initialDestinations={result.data}
            initialTotal={result.total}
            initialHasMore={result.hasMore}
            initialFilters={params}
          />
        </Suspense>
      </div>

      <Footer />
    </main>
  );
}
