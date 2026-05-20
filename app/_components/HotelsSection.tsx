import Image from "next/image";
import Link from "next/link";

interface Hotel {
  name: string;
  city: string;
  stars: number;
  pricePerNight: string;
  image: string;
}

const HOTELS: Hotel[] = [
  {
    name: "Taj Ummed Ahmedabad",
    city: "Ahmedabad",
    stars: 5,
    pricePerNight: "8,500",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500",
  },
  {
    name: "Gir Forest Lodge",
    city: "Sasan Gir",
    stars: 4,
    pricePerNight: "5,200",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500",
  },
  {
    name: "Tent City Narmada",
    city: "Kevadia",
    stars: 4,
    pricePerNight: "4,800",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500",
  },
  {
    name: "Radhika Beach Resort",
    city: "Diu",
    stars: 3,
    pricePerNight: "3,200",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500",
  },
  {
    name: "Rann Riders Resort",
    city: "Bhuj",
    stars: 3,
    pricePerNight: "2,900",
    image: "https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?w=500",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <span className="text-orange-400 text-xs tracking-tight" aria-label={`${count} stars`}>
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

export default function HotelsSection() {
  return (
    <section className="bg-gray-50 px-6 py-20 md:py-24">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
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

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {HOTELS.map((hotel) => (
            <article
              key={hotel.name}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-36 overflow-hidden">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-2 p-4 flex-1">
                <h3 className="text-gray-900 font-semibold text-sm leading-snug line-clamp-2">
                  {hotel.name}
                </h3>
                <p className="text-gray-400 text-xs">{hotel.city}</p>
                <StarRating count={hotel.stars} />
                <div className="mt-auto pt-2 border-t border-gray-100">
                  <p className="text-gray-400 text-xs">Per night</p>
                  <p className="text-gray-900 font-bold text-sm">&#8377;{hotel.pricePerNight}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Explore more CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/hotels"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-orange-300 hover:text-orange-600 transition-colors duration-200 text-sm shadow-sm"
          >
            Explore All Hotels
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
