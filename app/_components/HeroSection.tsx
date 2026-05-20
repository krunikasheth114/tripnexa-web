import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-white min-h-[90vh] flex items-center px-6 py-16 md:py-0">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-center">

        {/* Left — two overlapping images (3/5 on desktop) */}
        <div className="md:col-span-3 relative h-[420px] md:h-[580px]">
          {/* Img1 — large, left-top anchored */}
          <div className="absolute left-0 top-0 w-[85%] h-[88%] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?w=800"
              alt="Rann of Kutch white salt desert at sunset"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
          </div>

          {/* Img2 — smaller floating card, offset bottom-right */}
          <div className="absolute right-0 bottom-0 w-[52%] h-[54%] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white">
            <Image
              src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500"
              alt="Ancient Gujarat temple architecture"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 55vw, 28vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Floating badge */}
          <div className="absolute right-0 bottom-[calc(54%-12px)] mr-2 bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg z-10">
            20+ Destinations
          </div>
        </div>

        {/* Right — text content (2/5 on desktop) */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Discovery tag */}
          <span className="inline-flex items-center gap-2 w-fit bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-lg">
            Discover Gujarat
          </span>

          {/* Headline */}
          <h1 className="font-[family-name:var(--font-playfair)] font-bold text-gray-900 text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.1] tracking-tight">
            Explore the Soul of India
          </h1>

          {/* Description */}
          <p className="text-gray-500 text-base leading-relaxed max-w-sm">
            From the white salt deserts of Rann to ancient temple towns —
            Gujarat awaits. Curated travel packages built for modern explorers.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/destinations"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 text-sm shadow-sm"
            >
              Explore Packages
            </Link>
            <Link
              href="/destinations"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 text-sm"
            >
              View Destinations
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
            <div className="flex flex-col gap-0.5">
              <span className="text-gray-900 font-bold text-lg">500+</span>
              <span className="text-gray-400 text-xs">Happy Travellers</span>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="flex flex-col gap-0.5">
              <span className="text-gray-900 font-bold text-lg">20+</span>
              <span className="text-gray-400 text-xs">Destinations</span>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="flex flex-col gap-0.5">
              <span className="text-gray-900 font-bold text-lg">4.9★</span>
              <span className="text-gray-400 text-xs">Avg. Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
