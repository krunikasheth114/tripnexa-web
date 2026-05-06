"use client";

import { useEffect, useState } from "react";
import { fetchDestinations } from "@/services/destinations";
import DestinationCard from "@/app/destinations/components/DestinationCard";
import DestinationCardSkeleton from "./skeleton/DestinationSkeleton";

const CARDS_PER_SLIDE = 4;
const AUTO_SLIDE_MS = 10000;


interface DestinationCardItem {
    id: number;
    slug: string;
    name: string;
    tagline: string;
    image: string
    category: string;
}


export default function DestinationsSection() {
    const [destinations, setDestinations] = useState<DestinationCardItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDestinations = async () => {
            try {
                const destinations = await fetchDestinations();
                console.log(destinations);
                const mapped = destinations.map((item) => ({
                    id: item.id,
                    slug: item.slug,
                    name: item.name,
                    tagline:
                        item.description ??
                        "Explore curated travel packages for this destination.",

                    image:
                        item.gallery?.[0]?.url ||
                        "/images/default-destination.jpg",

                    category: item.type
                        ? item.type.charAt(0).toUpperCase() + item.type.slice(1)
                        : "Other",
                }));
                setDestinations(mapped);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        getDestinations();
    }, []);


    console.log("loading", loading);

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

                {loading ? (
                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <DestinationCardSkeleton key={index} />
                        ))}
                    </div>
                ) : destinations.length > 0 ? (
                    <div className="mt-10 overflow-hidden transition-opacity duration-300">
                        <div
                            className="flex transition-transform duration-700 ease-out"
                        //   style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {destinations.map((slide, index) => (
                                <div key={`slide-${index}`} className="min-w-full">
                                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                        {destinations.map((destination) => (
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
                    </div>
                ) : (
                    <div className="mt-12 rounded-[12px] border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
                        No destinations found.
                    </div>
                )}

            </div>
        </section>
    );
}
