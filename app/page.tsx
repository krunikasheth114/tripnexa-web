import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/features/home/components/HeroSection";
import SeasonalPicksSection from "@/features/home/components/SeasonalPicksSection";
import CategoryFilter from "@/features/destinations/components/CategoryFilter";
import DestinationsSection from "@/features/destinations/components/DestinationsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <Navbar />
      <HeroSection />
      {/* <CategoryFilter /> */}
      <DestinationsSection />
      <SeasonalPicksSection />
      <Footer />
    </main>
  );
}
