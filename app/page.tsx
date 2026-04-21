"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryFilter from "@/components/CategoryFilter";
import DestinationsSection from "@/components/DestinationsSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <Navbar />
      <HeroSection />
      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <DestinationsSection activeCategory={activeCategory} />
      <Footer />
    </main>
  );
}
