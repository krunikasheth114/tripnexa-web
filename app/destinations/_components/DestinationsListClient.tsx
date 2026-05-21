"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import type { DestinationListItem, FetchDestinationsListParams } from "@/services/destinations";
import { DESTINATION_TYPES } from "@/services/destinations";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const PAGE_LIMIT = 12;

// ── API fetch helper ──────────────────────────────────────────────────────────
async function fetchFromApi(params: FetchDestinationsListParams): Promise<{
  data: DestinationListItem[];
  total: number;
  hasMore: boolean;
}> {
  const qs = new URLSearchParams();
  const entries = Object.entries(params) as [string, unknown][];
  for (const [k, v] of entries) {
    if (v !== undefined && v !== "" && v !== null) qs.set(k, String(v));
  }
  const res = await fetch(`${API_BASE}/web/destinations/list?${qs}`, {
    cache: "no-store",
  });
  const json = await res.json();
  return json.data;
}

// ── Destination Card ──────────────────────────────────────────────────────────
function DestinationCard({ dest }: { dest: DestinationListItem }) {
  const imageUrl = dest.gallery?.[0]?.url ?? null;

  return (
    <Link
      href={`/destinations/${dest.id}`}
      className="group block relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={dest.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center">
          <svg
            className="w-16 h-16 text-orange-200"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent group-hover:from-black/85 transition-all duration-300" />

      {/* Type badge */}
      {dest.type && (
        <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm capitalize">
          {dest.type.charAt(0) + dest.type.slice(1).toLowerCase()}
        </span>
      )}

      {/* Package count */}
      {dest._count.packages > 0 && (
        <span className="absolute top-4 right-4 bg-black/50 text-white text-xs font-semibold px-2.5 py-1 rounded-lg backdrop-blur-sm">
          {dest._count.packages} package{dest._count.packages !== 1 ? "s" : ""}
        </span>
      )}

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-[family-name:var(--font-playfair)] font-bold text-white text-xl leading-tight">
          {dest.name}
        </h3>
        {dest.description && (
          <p className="text-white/75 text-sm mt-1.5 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {dest.description}
          </p>
        )}
        <div className="mt-3 flex items-center gap-1 text-orange-300 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>View Packages</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-orange-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <h3 className="text-gray-900 font-semibold text-lg">No destinations found</h3>
      <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
      <button
        onClick={onClear}
        className="mt-5 text-sm font-semibold text-orange-500 hover:text-orange-600 underline underline-offset-2"
      >
        Clear filters
      </button>
    </div>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface Props {
  initialDestinations: DestinationListItem[];
  initialTotal: number;
  initialHasMore: boolean;
  initialFilters: FetchDestinationsListParams;
}

// ── Main component ────────────────────────────────────────────────────────────
export default function DestinationsListClient({
  initialDestinations,
  initialTotal,
  initialHasMore,
  initialFilters,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [destinations, setDestinations] = useState<DestinationListItem[]>(initialDestinations);
  const [total, setTotal] = useState(initialTotal);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Filters
  const [typeFilter, setTypeFilter] = useState(initialFilters.type ?? "");
  const [searchFilter, setSearchFilter] = useState(initialFilters.search ?? "");

  const loadingMoreRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync URL on filter change
  const updateUrl = useCallback(
    (type: string, search: string) => {
      const qs = new URLSearchParams();
      if (type) qs.set("type", type);
      if (search) qs.set("search", search);
      const q = qs.toString();
      router.replace(pathname + (q ? `?${q}` : ""), { scroll: false });
    },
    [router, pathname]
  );

  // Reset on filter change
  const applyFilters = useCallback(
    async (type: string, search: string) => {
      setLoading(true);
      updateUrl(type, search);
      try {
        const result = await fetchFromApi({ type: type || undefined, search: search || undefined, page: 1, limit: PAGE_LIMIT });
        setDestinations(result.data);
        setTotal(result.total);
        setHasMore(result.hasMore);
        setPage(1);
      } finally {
        setLoading(false);
      }
    },
    [updateUrl]
  );

  const handleTypeChange = (val: string) => {
    setTypeFilter(val);
    applyFilters(val, searchFilter);
  };

  // Debounced search
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearchChange = (val: string) => {
    setSearchFilter(val);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => applyFilters(typeFilter, val), 600);
  };

  const clearFilters = () => {
    setTypeFilter("");
    setSearchFilter("");
    applyFilters("", "");
  };

  // Load more (infinite scroll)
  const loadMore = useCallback(async () => {
    if (loadingMoreRef.current || !hasMore) return;
    loadingMoreRef.current = true;
    const nextPage = page + 1;
    try {
      const result = await fetchFromApi({
        type: typeFilter || undefined,
        search: searchFilter || undefined,
        page: nextPage,
        limit: PAGE_LIMIT,
      });
      setDestinations((d) => {
        const seen = new Set(d.map((x) => x.id));
        return [...d, ...result.data.filter((x) => !seen.has(x.id))];
      });
      setHasMore(result.hasMore);
      setPage(nextPage);
    } finally {
      loadingMoreRef.current = false;
    }
  }, [hasMore, page, typeFilter, searchFilter]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "200px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  const hasFilters = Boolean(typeFilter || searchFilter);

  return (
    <div>
      {/* Filters bar */}
      <div className="flex flex-wrap gap-3 mb-8 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchFilter}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition"
          />
        </div>

        {/* Type filter */}
        <select
          value={typeFilter}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="py-2.5 px-4 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition text-gray-700"
        >
          <option value="">All Types</option>
          {DESTINATION_TYPES.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0) + t.slice(1).toLowerCase()}
            </option>
          ))}
        </select>

        {/* Clear */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-sm font-semibold text-orange-500 hover:text-orange-600 px-3 py-2.5 rounded-xl hover:bg-orange-50 transition"
          >
            Clear
          </button>
        )}

        {/* Count */}
        {mounted && (
          <p className="text-sm text-gray-400 ml-auto">
            {total} destination{total !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <svg className="animate-spin h-8 w-8 text-orange-400" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
      ) : destinations.length === 0 ? (
        <div className="grid">
          <EmptyState onClear={clearFilters} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} dest={dest} />
          ))}
        </div>
      )}

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className="h-4 mt-6" />

      {/* Loading more spinner */}
      {hasMore && mounted && (
        <div className="flex justify-center py-6">
          <svg className="animate-spin h-6 w-6 text-orange-300" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
      )}
    </div>
  );
}
