import Image from "next/image";
import Link from "next/link";
import { fetchHotels, type ApiHotel } from "@/services/hotels";

function Stars({ count }: { count: number }) {
  return (
    <span className="text-orange-400 text-xs tracking-tight" aria-label={`${count} stars`}>
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

function HotelCard({ hotel }: { hotel: ApiHotel }) {
  const imageUrl = hotel.gallery?.[0]?.url ?? null;

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="relative h-36 overflow-hidden bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={hotel.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-orange-200" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="flex flex-col gap-2 p-4 flex-1">
        <h3 className="text-gray-900 font-semibold text-sm leading-snug line-clamp-2">
          {hotel.name}
        </h3>
        {hotel.city && <p className="text-gray-400 text-xs">{hotel.city}</p>}
        {hotel.starRating && <Stars count={hotel.starRating} />}
        {hotel.perNightPrice && (
          <div className="mt-auto pt-2 border-t border-gray-100">
            <p className="text-gray-400 text-xs">Per night</p>
            <p className="text-gray-900 font-bold text-sm">
              &#8377;{hotel.perNightPrice.toLocaleString("en-IN")}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

export default async function HotelsSection() {
  const result = await fetchHotels({ limit: 6 });
  const hotels = result.data;

  if (hotels.length === 0) return null;

  return (
    <section className="bg-gray-50 px-6 py-20 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500 mb-3">
            Where to Stay
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="font-[family-name:var(--font-playfair)] font-bold text-gray-900 text-3xl md:text-4xl lg:text-5xl">
                Top Hotels
              </h2>
              <p className="mt-3 text-gray-500 text-base leading-relaxed max-w-lg">
                Handpicked stays across Gujarat — from luxury retreats to heritage boutiques.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/hotels"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-orange-300 hover:text-orange-600 transition-colors duration-200 text-sm shadow-sm"
          >
            Explore All Hotels
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
