import Image from "next/image";
import Link from "next/link";
import apiClient from "@/lib/axios";

interface ApiDestinationHome {
  id: number;
  name: string;
  slug: string;
  type: string | null;
  description: string | null;
  gallery: { url: string }[];
}

interface PaginatedApiResponse {
  status: string;
  statusCode: number;
  data: {
    data: ApiDestinationHome[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

async function fetchHomepageDestinations(): Promise<ApiDestinationHome[]> {
  try {
    const response = await apiClient.get<PaginatedApiResponse>(
      "/web/destinations/list",
      { params: { limit: 3 } }
    );
    return response.data.data?.data ?? [];
  } catch {
    return [];
  }
}

// Fallback static data when API has no destinations yet
const FALLBACK_DESTINATIONS: ApiDestinationHome[] = [
  {
    id: 0,
    name: "Rann of Kutch",
    slug: "rann-of-kutch",
    type: "DESERT",
    description: "White salt desert under an endless sky",
    gallery: [{ url: "https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?w=600" }],
  },
  {
    id: 0,
    name: "Gir National Park",
    slug: "gir",
    type: "WILDLIFE",
    description: "Home of the last Asiatic lions on earth",
    gallery: [{ url: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600" }],
  },
  {
    id: 0,
    name: "Somnath",
    slug: "somnath",
    type: "RELIGIOUS",
    description: "Sacred shores and ancient temple glory",
    gallery: [{ url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600" }],
  },
];

export default async function DestinationsHomeSection() {
  const apiDestinations = await fetchHomepageDestinations();
  const destinations = (apiDestinations.length > 0 ? apiDestinations : FALLBACK_DESTINATIONS).slice(0, 3);

  return (
    <section className="bg-gray-50 px-6 py-20 md:py-24">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500 mb-3">
            Gujarat&apos;s Finest
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="font-[family-name:var(--font-playfair)] font-bold text-gray-900 text-3xl md:text-4xl lg:text-5xl">
                Popular Destinations
              </h2>
              <p className="mt-3 text-gray-500 text-base leading-relaxed max-w-lg">
                Discover Gujarat&apos;s most visited places — each with its own story to tell.
              </p>
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => {
            const imageUrl = dest.gallery?.[0]?.url ?? null;
            // If real API destination: link to /destinations/[id] (shows packages for that destination)
            // If fallback (id=0): link to /destinations listing
            const href = dest.id > 0 ? `/destinations/${dest.id}` : "/destinations";

            return (
              <Link
                key={dest.id > 0 ? dest.id : dest.name}
                href={href}
                className="group block relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
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
                    <svg className="w-16 h-16 text-orange-200" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent group-hover:from-black/85 transition-all duration-300" />

                {/* Badge */}
                {dest.type && (
                  <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm capitalize">
                    {dest.type.charAt(0) + dest.type.slice(1).toLowerCase()}
                  </span>
                )}

                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-[family-name:var(--font-playfair)] font-bold text-white text-2xl leading-tight">
                    {dest.name}
                  </h3>
                  {dest.description && (
                    <p className="text-white/80 text-sm mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {dest.description}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Explore more CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-orange-300 hover:text-orange-600 transition-colors duration-200 text-sm shadow-sm"
          >
            Explore All Destinations
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
