"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const heroImages = [
  { src: "/hero/gujarat-hero.jpg", alt: "Gujarat landscape" },
  { src: "/hero/somnath-temple.jpg", alt: "Somnath Temple, Gujarat" },
  { src: "/hero/dwarka.jpg", alt: "Dwarka Chardham Temple, Gujarat" },
  { src: "/hero/gir.avif", alt: "Gir Forest National Park" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = useCallback(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    setIntervalId(id);
    return id;
  }, []);

  useEffect(() => {
    const id = startAutoPlay();
    return () => clearInterval(id);
  }, [startAutoPlay]);

  const goTo = useCallback(
    (index: number) => {
      if (intervalId) clearInterval(intervalId);
      setCurrent((index + heroImages.length) % heroImages.length);
      startAutoPlay();
    },
    [intervalId, startAutoPlay]
  );

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  return (
    <section className="min-h-[720px] relative overflow-hidden">
      {/* Carousel Images */}
      {heroImages.map((img, i) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/65" />

      {/* Left Arrow */}
      <button
        onClick={prev}
        aria-label="Previous image"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={next}
        aria-label="Next image"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        {/* Eyebrow pill */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-orange-200 text-xs font-semibold tracking-[0.2em] uppercase mb-6">
          Gujarat&apos;s Premier Travel Platform
        </span>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-[family-name:var(--font-playfair)] font-bold text-white leading-[1.05] tracking-tight max-w-4xl">
          Explore Gujarat the Nexa Way
        </h1>

        <p className="text-lg text-white/75 max-w-xl text-center leading-relaxed mt-6">
          Discover the land of heritage, devotion, and adventure — curated
          travel packages crafted for the modern explorer.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#destinations"
            className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-colors"
          >
            Start Exploring
          </a>
          <a
            href="#destinations"
            className="border border-white/50 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors"
          >
            View Destinations
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/50 text-xs tracking-[0.2em] uppercase">
          Scroll to Explore
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 text-white/40 animate-bounce"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
