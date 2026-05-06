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
    <section className="min-h-screen relative overflow-hidden">
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

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

      {/* Left Arrow */}
      <button
        onClick={prev}
        aria-label="Previous image"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/60 text-white rounded-full w-11 h-11 flex items-center justify-center transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={next}
        aria-label="Next image"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/60 text-white rounded-full w-11 h-11 flex items-center justify-center transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
         Explore Gujarat the Nexa Way
        </h1>

        <p className="text-lg md:text-xl text-gray-300 font-medium mt-4 max-w-2xl">
        Explore the land of heritage, devotion, and adventure — crafted travel packages across Gujarat.        
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#destinations"
            className="bg-[#28536B] text-white px-6 py-3 rounded-[8px] font-semibold hover:bg-[#1e3f52] transition-colors duration-200"
          >
            Start Your Journey
          </a>
          <a
            href="#destinations"
            className="border-2 border-white text-white px-6 py-3 rounded-[8px] font-semibold hover:bg-white hover:text-[#28536B] transition-all duration-200"
          >
            View Packages
          </a>
        </div>
      </div>

    </section>
  );
}
