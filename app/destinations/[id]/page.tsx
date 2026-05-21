import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DestinationItineraryExplorer from "@/app/destinations/components/DestinationItineraryExplorer";
import { fetchPackagesByDestinationId, } from "@/services/destinations";
import Layout from "@/components/Layout";

type DestinationPageProps = {
    params: Promise<{ id: string }>;
};



export default async function DestinationDetailsPage(
    props: DestinationPageProps
) {
    const { id } = await props.params;
    const packages = await fetchPackagesByDestinationId(id);

    if (!packages.length) {
        notFound();
    }

    // Destination info lives on every package — grab it from the first one
    const destInfo = packages[0].destination;
    // Hero image: first gallery item across all packages that has one
    const heroImage =
        packages.find((p) => p.gallery?.[0]?.url)?.gallery[0]?.url
        ?? "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1400&auto=format&fit=crop";

    const destination = {
        id: destInfo?.id,
        name: destInfo?.name ?? "",
        description: destInfo?.description ?? "",
        image: heroImage,
    };

    console.log("destination", destination);
    console.log("packages", packages);

    return (
        <main className="min-h-screen bg-white">
            <Layout>
                {/* Hero */}
                <section className="relative h-[380px] md:h-[460px] overflow-hidden bg-gray-900">
                    {destination.image ? (
                        <Image
                            src={destination.image}
                            alt={destination?.name ?? "Destination"}
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover"
                        />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/75" />
                    <div className="relative mx-auto flex h-full max-w-7xl flex-col items-start justify-end px-6 pb-14 gap-2">
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-white/60">Home</span>
                            <span className="text-white/40">›</span>
                            <span className="font-medium text-orange-300">{destination.name}</span>
                        </div>
                        <h1 className="text-4xl font-[family-name:var(--font-playfair)] font-bold text-white md:text-6xl">
                            {destination.name}
                        </h1>
                        {destination.description && (
                            <p className="max-w-2xl text-base leading-relaxed text-white/80">
                                {destination.description}
                            </p>
                        )}
                    </div>
                </section>

                {/* Packages */}
                <section className="mx-auto max-w-7xl px-6 py-14">
                    <div className="mb-8">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
                            Available Packages
                        </p>
                        <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-gray-900 md:text-3xl">
                            Choose your itinerary
                        </h2>
                    </div>
                    <DestinationItineraryExplorer
                        destination={destination}
                        packages={packages}
                    />
                </section>
            </Layout>
        </main>
    );
}
