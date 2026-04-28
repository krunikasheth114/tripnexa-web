"use client";

import { useEffect, useState } from "react";
import { destinations } from "@/features/destinations/data";
import DestinationCard from "@/features/destinations/components/DestinationCard";
import { ApiDestination, fetchDestinations } from "@/services/destinations";

const CARDS_PER_SLIDE = 4;
const AUTO_SLIDE_MS = 10000;

function toSlides<T>(items: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
}

export default function DestinationsSection() {
const [destinations, setDestinations] = useState<ApiDestination[]>([]);
const [loading, setLoading] = useState(true);
const slides = toSlides(destinations, CARDS_PER_SLIDE);
const [activeSlide, setActiveSlide] = useState(0);
  const currentSlide = slides.length > 0 ? activeSlide % slides.length : 0;


  useEffect(() => {
  async function loadDestinations() {
    const data = await fetchDestinations();
    const mappedDestinations = data.map((d) => ({
    id: d.id,
    name: d.name,
    tagline: d.description || "Description not available",
    image: `/images/destinations/${d.slug}.jpg`, // adjust as per your images
    category: d.type || "general",
    }));    
    setDestinations(mappedDestinations);
    setLoading(false);
  }

  loadDestinations();
}, []);
  useEffect(() => {
    if (slides.length <= 1) return;
    const intervalId = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, AUTO_SLIDE_MS);
    return () => clearInterval(intervalId);
  }, [slides.length]);

  return (
    <section id="destinations" className="bg-[#FAFAF8] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#C2948A]">
            Discover Gujarat
          </p>
          <h2 className="text-3xl font-bold text-[#28536B] md:text-5xl">
            Find Your Perfect Getaway
          </h2>
        </div>

        <div className="mt-10 overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={`slide-${index}`} className="min-w-full">
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {slide.map((destination) => (
                    <DestinationCard
                      key={destination.id}
                      id={destination.id}
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
        </div>

        {slides.length > 1 ? (
          <div className="mt-8 flex items-center justify-center gap-2.5">
            {slides.map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-[#28536B]"
                    : "w-2.5 bg-[#28536B]/30 hover:bg-[#28536B]/60"
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
