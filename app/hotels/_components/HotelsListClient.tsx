"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import type { ApiHotel, FetchHotelsParams } from "@/services/hotels";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const PAGE_LIMIT = 9;

// Consistent number formatter — avoids Node.js vs browser locale differences
function fmt(n: number) {
  return n.toLocaleString("en-IN");
}

// ── Helpers ───────────────────────────────────────────────────────
async function fetchFromApi(params: FetchHotelsParams): Promise<{
  data: ApiHotel[];
  total: number;
  hasMore: boolean;
}> {
  const qs = new URLSearchParams();
  const entries: [string, unknown][] = Object.entries(params);
  for (const [k, v] of entries) {
    if (v !== undefined && v !== "" && v !== null) qs.set(k, String(v));
  }
  const res = await fetch(`${API_BASE}/web/hotels?${qs}`, { cache: "no-store" });
  const json = await res.json();
  return json.data;
}

// ── Stars ─────────────────────────────────────────────────────────
function Stars({ count }: { count: number }) {
  return (
    <span className="text-orange-400 text-xs tracking-tight">
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

// ── Hotel Card ────────────────────────────────────────────────────
function HotelCard({ hotel }: { hotel: ApiHotel }) {
  const imageUrl = hotel.gallery?.[0]?.url ?? null;

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 flex flex-col">
      <div className="relative h-52 overflow-hidden bg-gray-100 shrink-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={hotel.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-orange-200" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {hotel.starRating && (
          <span className="absolute top-3 left-3 flex items-center gap-1 bg-black/50 text-white text-xs font-semibold px-2.5 py-1 rounded-lg backdrop-blur-sm">
            <svg className="w-3 h-3 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.05 2.927z" />
            </svg>
            {hotel.starRating}-Star
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 p-5 flex-1">
        <div className="flex-1">
          <h3 className="font-[family-name:var(--font-playfair)] font-bold text-gray-900 text-base leading-snug">
            {hotel.name}
          </h3>
          {hotel.city && (
            <div className="flex items-center gap-1 mt-1">
              <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-gray-400 text-xs">{hotel.city}</p>
            </div>
          )}
          {hotel.starRating && <div className="mt-2"><Stars count={hotel.starRating} /></div>}
          {hotel.description && (
            <p className="mt-2 text-xs text-gray-400 leading-relaxed line-clamp-2">
              {hotel.description}
            </p>
          )}
        </div>

        {hotel.perNightPrice && (
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-2">
            <div>
              <p className="text-gray-400 text-xs">Per night</p>
              <p className="text-gray-900 font-bold text-base" suppressHydrationWarning>
                &#8377;{fmt(hotel.perNightPrice)}
              </p>
            </div>
            <span className="bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1.5 rounded-lg">
              View Hotel
            </span>
          </div>
        )}
      </div>
    </article>
  );
}

// ── Props ─────────────────────────────────────────────────────────
interface Destination { id: number; name: string; }

interface Props {
  initialHotels: ApiHotel[];
  initialTotal: number;
  initialHasMore: boolean;
  destinations: Destination[];
  initialFilters: FetchHotelsParams;
}

// ── Main Component ────────────────────────────────────────────────
export default function HotelsListClient({
  initialHotels,
  initialTotal,
  initialHasMore,
  destinations,
  initialFilters,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  // Prevent SSR/client hydration mismatch for dynamic content
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Filter state
  const [destinationId, setDestinationId] = useState(
    initialFilters.destinationId ? String(initialFilters.destinationId) : ""
  );
  const [starRating, setStarRating] = useState(
    initialFilters.starRating ? String(initialFilters.starRating) : ""
  );
  const [minPrice, setMinPrice] = useState(
    initialFilters.minPrice ? String(initialFilters.minPrice) : ""
  );
  const [maxPrice, setMaxPrice] = useState(
    initialFilters.maxPrice ? String(initialFilters.maxPrice) : ""
  );

  // Hotels state
  const [hotels, setHotels] = useState<ApiHotel[]>(initialHotels);
  const [total, setTotal] = useState(initialTotal);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [currentPage, setCurrentPage] = useState(1);

  // Loading states
  const [filtering, setFiltering] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Debounce timer for price inputs
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sentinel ref for infinite scroll
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadingMoreRef = useRef(false); // non-reactive copy to avoid stale closure in observer

  // Build URL from current filter state
  function buildUrl(f: { destinationId: string; starRating: string; minPrice: string; maxPrice: string }) {
    const p = new URLSearchParams();
    if (f.destinationId) p.set("destinationId", f.destinationId);
    if (f.starRating) p.set("starRating", f.starRating);
    if (f.minPrice) p.set("minPrice", f.minPrice);
    if (f.maxPrice) p.set("maxPrice", f.maxPrice);
    const qs = p.toString();
    return `${pathname}${qs ? `?${qs}` : ""}`;
  }

  // Apply filters — resets to page 1
  async function applyFilters(f: {
    destinationId: string;
    starRating: string;
    minPrice: string;
    maxPrice: string;
  }) {
    setFiltering(true);
    try {
      const result = await fetchFromApi({
        destinationId: f.destinationId ? Number(f.destinationId) : undefined,
        starRating: f.starRating ? Number(f.starRating) : undefined,
        minPrice: f.minPrice ? Number(f.minPrice) : undefined,
        maxPrice: f.maxPrice ? Number(f.maxPrice) : undefined,
        page: 1,
        limit: PAGE_LIMIT,
      });
      setHotels(result.data);
      setTotal(result.total);
      setHasMore(result.hasMore);
      setCurrentPage(1);
      router.replace(buildUrl(f), { scroll: false });
    } catch {
      // keep existing
    } finally {
      setFiltering(false);
    }
  }

  // Immediate filter (dropdown selects)
  function handleSelect(key: "destinationId" | "starRating", value: string) {
    const f = { destinationId, starRating, minPrice, maxPrice, [key]: value };
    if (key === "destinationId") setDestinationId(value);
    else setStarRating(value);
    applyFilters(f);
  }

  // Debounced filter (price inputs)
  function handlePriceInput(key: "minPrice" | "maxPrice", value: string) {
    if (key === "minPrice") setMinPrice(value);
    else setMaxPrice(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const f = { destinationId, starRating, minPrice, maxPrice, [key]: value };
      applyFilters(f);
    }, 600);
  }

  // Reset all
  async function handleReset() {
    setDestinationId("");
    setStarRating("");
    setMinPrice("");
    setMaxPrice("");
    applyFilters({ destinationId: "", starRating: "", minPrice: "", maxPrice: "" });
  }

  // Load next page — called by intersection observer
  const loadMore = useCallback(async () => {
    if (loadingMoreRef.current) return;
    loadingMoreRef.current = true;
    setLoadingMore(true);
    try {
      setCurrentPage((prev) => {
        const nextPage = prev + 1;
        // fire async inside setter to capture latest page
        fetchFromApi({
          destinationId: destinationId ? Number(destinationId) : undefined,
          starRating: starRating ? Number(starRating) : undefined,
          minPrice: minPrice ? Number(minPrice) : undefined,
          maxPrice: maxPrice ? Number(maxPrice) : undefined,
          page: nextPage,
          limit: PAGE_LIMIT,
        }).then((result) => {
          setHotels((h) => {
            const seen = new Set(h.map((x) => x.id));
            const fresh = result.data.filter((x) => !seen.has(x.id));
            return [...h, ...fresh];
          });
          setHasMore(result.hasMore);
        }).catch(() => {}).finally(() => {
          loadingMoreRef.current = false;
          setLoadingMore(false);
        });
        return nextPage;
      });
    } catch {
      loadingMoreRef.current = false;
      setLoadingMore(false);
    }
  }, [destinationId, starRating, minPrice, maxPrice]);

  // Intersection observer — triggers loadMore when sentinel enters viewport
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "200px" } // start loading 200px before bottom
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  const hasActiveFilters = destinationId || starRating || minPrice || maxPrice;

  return (
    <div className="space-y-6">

      {/* ── Filter Bar ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div className="flex flex-wrap items-end gap-4">

          {/* Destination */}
          <div className="flex flex-col gap-1.5 min-w-[180px]">
            <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Destination
            </label>
            <select
              value={destinationId}
              onChange={(e) => handleSelect("destinationId", e.target.value)}
              className="h-10 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all cursor-pointer"
            >
              <option value="">All Destinations</option>
              {destinations.map((d) => (
                <option key={d.id} value={String(d.id)}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Star Rating */}
          <div className="flex flex-col gap-1.5 min-w-[150px]">
            <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Hotel Type
            </label>
            <select
              value={starRating}
              onChange={(e) => handleSelect("starRating", e.target.value)}
              className="h-10 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all cursor-pointer"
            >
              <option value="">All Star Ratings</option>
              <option value="5">⭐⭐⭐⭐⭐  5 Star</option>
              <option value="4">⭐⭐⭐⭐  4 Star</option>
              <option value="3">⭐⭐⭐  3 Star</option>
              <option value="2">⭐⭐  2 Star</option>
              <option value="1">⭐  1 Star</option>
            </select>
          </div>

          {/* Price range */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Price per Night (₹)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                value={minPrice}
                onChange={(e) => handlePriceInput("minPrice", e.target.value)}
                placeholder="Min"
                className="h-10 w-28 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              />
              <span className="text-gray-400 text-sm">—</span>
              <input
                type="number"
                min={0}
                value={maxPrice}
                onChange={(e) => handlePriceInput("maxPrice", e.target.value)}
                placeholder="Max"
                className="h-10 w-28 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>
          </div>

          {/* Clear button */}
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="h-10 px-4 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 hover:text-red-500 transition-colors flex items-center gap-1.5 self-end"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* ── Results count — only after mount to avoid hydration mismatch ── */}
      <div className="flex items-center gap-2 min-h-[24px]">
        {mounted && (
          filtering ? (
            <span className="flex items-center gap-2 text-sm text-gray-400">
              <svg className="animate-spin h-4 w-4 text-orange-400" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Applying filters…
            </span>
          ) : (
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">{total}</span>
              {" "}hotel{total !== 1 ? "s" : ""} found
            </p>
          )
        )}
      </div>

      {/* ── Grid ── */}
      {hotels.length === 0 && !filtering ? (
        <div className="flex flex-col items-center justify-center py-24 rounded-2xl border border-dashed border-gray-200 bg-white text-center">
          <svg className="w-14 h-14 text-gray-200 mb-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21" />
          </svg>
          <p className="text-gray-500 font-medium text-base">No hotels match your filters</p>
          <p className="text-gray-400 text-sm mt-1">Try adjusting or clearing the filters above</p>
          <button
            onClick={handleReset}
            className="mt-4 text-orange-500 text-sm font-semibold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-200 ${filtering ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}

      {/* ── Infinite scroll sentinel ── */}
      {hasMore && !filtering && (
        <div ref={sentinelRef} className="flex flex-col items-center gap-2 py-8">
          {loadingMore && (
            <svg className="animate-spin h-6 w-6 text-orange-400" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          )}
        </div>
      )}

      {/* ── End of results ── */}
      {mounted && !hasMore && hotels.length > 0 && !filtering && (
        <p className="text-center text-xs text-gray-400 py-6">
          All {total} hotel{total !== 1 ? "s" : ""} loaded
        </p>
      )}
    </div>
  );
}
