import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DestinationItineraryExplorer from "@/features/destinations/components/DestinationItineraryExplorer";
import {
  destinations,
  getDestinationById,
  getItinerariesByDestination,
} from "@/features/destinations/data";

type DestinationPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return destinations.map((destination) => ({ id: destination.id }));
}

export async function generateMetadata(
  props: DestinationPageProps
): Promise<Metadata> {
  const { id } = await props.params;
  const destination = getDestinationById(id);

  if (!destination) {
    return {
      title: "Destination Not Found - TripNexa",
    };
  }

  return {
    title: `${destination.name} Itineraries - TripNexa`,
    description: `Explore 2-day, 5-day, and 1-week itinerary options for ${destination.name} with multiple budget ranges.`,
  };
}

export default async function DestinationDetailsPage(props: DestinationPageProps) {
  const { id } = await props.params;
  const destination = getDestinationById(id);

  if (!destination) {
    notFound();
  }

  const itineraries = getItinerariesByDestination(id);

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <Navbar />

      <section className="relative isolate overflow-hidden">
        <div className="relative h-[340px] md:h-[420px]">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-black/70" />

          <div className="relative mx-auto flex h-full max-w-7xl items-end px-6 pb-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#E8C7BF]">
                Destination Itineraries
              </p>
              <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
                {destination.name}
              </h1>
              <p className="mt-3 max-w-3xl text-base text-white/85 md:text-lg">
                {destination.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-12 md:px-6 md:py-14">
        <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <h2 className="text-2xl font-bold text-[#28536B] md:text-3xl">
            Choose your stay duration and budget
          </h2>
          <span className="inline-flex w-fit rounded-[8px] bg-[#28536B]/10 px-3 py-1 text-sm font-medium text-[#28536B]">
            {destination.category}
          </span>
        </div>

        <DestinationItineraryExplorer
          destination={destination}
          itineraries={itineraries}
        />
      </section>

      <Footer />
    </main>
  );
}
