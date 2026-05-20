import Layout from "@/components/Layout";
import HeroSection from "@/app/_components/HeroSection";
import DestinationsHomeSection from "@/app/_components/DestinationsHomeSection";
import PackagesSection from "@/app/_components/PackagesSection";
import HotelsSection from "@/app/_components/HotelsSection";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <DestinationsHomeSection />
      <PackagesSection />
      <HotelsSection />
    </Layout>
  );
}
