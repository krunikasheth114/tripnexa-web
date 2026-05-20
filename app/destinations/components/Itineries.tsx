import Image from "next/image";
import Link from "next/link";
import type { ApiPackage } from "@/services/destinations";

interface ItineriesProps {
  packages: ApiPackage[];
}

const Itineries = ({ packages = [] }: ItineriesProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {packages.length > 0 ? (
        packages.map((pkg) => {
          const hasDiscount = pkg.discountPrice !== null && pkg.discountPrice < pkg.price;
          const savings = hasDiscount ? pkg.price - (pkg.discountPrice || 0) : 0;

          return (
            <article
              key={pkg.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              {/* Card image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={pkg.gallery?.[0]?.url || "/images/placeholder.jpg"}
                  alt={pkg.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800">
                  {pkg.accommodationType || "Package"}
                </span>
              </div>

              {/* Card body */}
              <div className="flex flex-1 flex-col gap-3 p-5">
                {/* Title + duration badge */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="line-clamp-2 flex-1 font-[family-name:var(--font-playfair)] text-base font-bold leading-snug text-gray-900">
                    {pkg.title}
                  </h3>
                  <span className="shrink-0 rounded-lg border border-orange-400/40 px-2.5 py-1 text-xs font-semibold text-orange-600">
                    {pkg.days}D / {pkg.nights}N
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  {pkg.days} Days · {pkg.nights} Nights
                </p>

                {/* Tags */}
                {pkg.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {pkg.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Accommodation */}
                {pkg.accommodationType && (
                  <p className="text-sm font-medium text-orange-600">
                    {pkg.accommodationType}
                  </p>
                )}

                {/* Price + CTA */}
                <div className="mt-auto rounded-xl bg-gray-50 p-4">
                  {hasDiscount && (
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-sm text-gray-500 line-through">
                        ₹{pkg.price.toLocaleString()}
                      </span>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                        Save ₹{savings.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-gray-900">
                        ₹{(pkg.discountPrice || pkg.price).toLocaleString()}
                      </span>
                      <span className="ml-1 text-sm text-gray-500">/Adult</span>
                    </div>
                    <Link
                      href={`/packages/${pkg.id}`}
                      className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })
      ) : (
        <div className="col-span-full rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center text-gray-500">
          No packages found for this destination.
        </div>
      )}
    </div>
  );
};

export default Itineries;
