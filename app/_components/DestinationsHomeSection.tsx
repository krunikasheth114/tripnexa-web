import Image from "next/image";
import Link from "next/link";

interface DestinationCard {
  name: string;
  tagline: string;
  image: string;
  badge: string;
  href: string;
}

const DESTINATIONS: DestinationCard[] = [
  {
    name: "Rann of Kutch",
    tagline: "White salt desert under an endless sky",
    image: "https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?w=600",
    badge: "Desert",
    href: "/destinations",
  },
  {
    name: "Gir National Park",
    tagline: "Home of the last Asiatic lions on earth",
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600",
    badge: "Wildlife",
    href: "/destinations",
  },
  {
    name: "Somnath",
    tagline: "Sacred shores and ancient temple glory",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600",
    badge: "Pilgrimage",
    href: "/destinations",
  },
];

export default function DestinationsHomeSection() {
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
          {DESTINATIONS.map((dest) => (
            <Link
              key={dest.name}
              href={dest.href}
              className="group block relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Gradient overlay — always dark so text is readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent group-hover:from-black/85 transition-all duration-300" />

              {/* Badge */}
              <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm">
                {dest.badge}
              </span>

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-[family-name:var(--font-playfair)] font-bold text-white text-2xl leading-tight">
                  {dest.name}
                </h3>
                <p className="text-white/80 text-sm mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {dest.tagline}
                </p>
              </div>
            </Link>
          ))}
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
