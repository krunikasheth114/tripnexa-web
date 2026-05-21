import Image from "next/image";
import Link from "next/link";
import { fetchFeaturedPackages, FeaturedPackage } from "@/services/destinations";

function PackageCard({ pkg }: { pkg: FeaturedPackage }) {
  const imageUrl = pkg.gallery[0]?.url ?? null;
  const tag = pkg.tags[0] ?? pkg.destination?.type ?? null;
  const duration = `${pkg.days}D / ${pkg.nights}N`;
  const displayPrice = (pkg.discountPrice ?? pkg.price).toLocaleString("en-IN");
  const hasDiscount = pkg.discountPrice !== null && pkg.discountPrice < pkg.price;

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={pkg.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Duration badge */}
        <span className="absolute top-3 right-3 bg-black/50 text-white text-xs font-semibold px-2.5 py-1 rounded-lg backdrop-blur-sm">
          {duration}
        </span>

        {/* Tag badge */}
        {tag && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-lg capitalize">
            {tag}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 gap-4 p-5">
        <div className="flex-1">
          <h3 className="font-[family-name:var(--font-playfair)] font-bold text-gray-900 text-lg leading-snug">
            {pkg.title}
          </h3>
          {pkg.destination && (
            <p className="text-gray-400 text-xs mt-1">{pkg.destination.name}</p>
          )}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-gray-400 text-xs">Starting from</p>
            <div className="flex items-baseline gap-1.5">
              <p className="text-gray-900 font-bold text-base">&#8377;{displayPrice}</p>
              {hasDiscount && (
                <p className="text-gray-400 text-xs line-through">
                  &#8377;{pkg.price.toLocaleString("en-IN")}
                </p>
              )}
            </div>
          </div>
          <Link
            href={`/packages/${pkg.id}`}
            className="bg-orange-500 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}

export default async function PackagesSection() {
  const packages = await fetchFeaturedPackages();

  if (packages.length === 0) return null;

  return (
    <section className="bg-white px-6 py-20 md:py-24">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500 mb-3">
            Curated For You
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] font-bold text-gray-900 text-3xl md:text-4xl lg:text-5xl">
            Featured Packages
          </h2>
          <p className="mt-3 text-gray-500 text-base leading-relaxed max-w-lg">
            Curated trips for every traveller — from solo adventurers to family getaways.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
