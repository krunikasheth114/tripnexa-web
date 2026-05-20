"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchDestinations } from "@/services/destinations";
import DestinationCard from "@/app/destinations/components/DestinationCard";
import DestinationCardSkeleton from "./skeleton/DestinationSkeleton";

const CARDS_PER_SLIDE = 4;
const AUTO_SLIDE_MS = 5000;

interface DestinationCardItem {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  image: string;
  category: string;
}

export default function DestinationsSection() {
  const [destinations, setDestinations] = useState<DestinationCardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const getDestinations = async () => {
      try {
        const destinations = await fetchDestinations();

        const mapped = destinations.map((item: any) => ({
          id: item.id,
          slug: item.slug,
          name: item.name,
          tagline:
            item.description ??
            "Explore curated travel packages for this destination.",
          image:
            item.gallery?.[0]?.url || "/images/default-destination.jpg",
          category: item.type
            ? item.type.charAt(0).toUpperCase() + item.type.slice(1)
            : "Other",
        }));

        setDestinations(mapped);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getDestinations();
  }, []);

  // Split into groups of 4
  const slides = useMemo(() => {
    const grouped = [];
    for (let i = 0; i < destinations.length; i += CARDS_PER_SLIDE) {
      grouped.push(destinations.slice(i, i + CARDS_PER_SLIDE));
    }
    return grouped;
  }, [destinations]);

  // Auto slide
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, AUTO_SLIDE_MS);

    return () => clearInterval(interval);
  }, [slides]);

  return (
    <section id="destinations" className="bg-gray-50 px-6 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500 mb-3">
            Discover Gujarat
          </p>
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] font-bold text-gray-900">
            Find Your Perfect Getaway
          </h2>
          <p className="mt-4 text-gray-500 text-base leading-relaxed max-w-lg mx-auto">
            Handpicked destinations across Gujarat, each with curated
            itineraries built by local experts.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <DestinationCardSkeleton key={index} />
            ))}
          </div>
        ) : destinations.length > 0 ? (
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="min-w-full flex-shrink-0">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {slide.map((destination) => (
                      <DestinationCard
                        key={destination.id}
                        id={destination.id}
                        slug={destination.slug}
                        name={destination.name}
                        tagline={destination.tagline}
                        image={destination.image}
                        category={destination.category}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            {slides.length > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      currentSlide === index
                        ? "bg-orange-500 w-6"
                        : "bg-gray-200 w-2"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center text-gray-500">
            No destinations found.
          </div>
        )}
      </div>
    </section>
  );
}
