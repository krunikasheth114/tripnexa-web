import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import BookingHeroGallery from "@/features/destinations/components/BookingHeroGallery";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  destinations,
  getDestinationById,
  getDestinationGallery,
  getItineraryById,
} from "@/features/destinations/data";

type BookingPageProps = {
  params: Promise<{ id: string; itineraryId: string }>;
};

function formatInr(value: number): string {
  return `INR ${value.toLocaleString("en-IN")}`;
}

export function generateStaticParams() {
  return destinations.flatMap((destination) =>
    ["2d-1n", "5d-4n", "7d-6n"].map((durationSlug) => ({
      id: destination.id,
      itineraryId: `${destination.id}-${durationSlug}`,
    }))
  );
}

export async function generateMetadata(
  props: BookingPageProps
): Promise<Metadata> {
  const { id, itineraryId } = await props.params;
  const destination = getDestinationById(id);
  const itinerary = getItineraryById(id, itineraryId);

  if (!destination || !itinerary) {
    return {
      title: "Booking Not Found - TripNexa",
    };
  }

  return {
    title: `${destination.name} ${itinerary.title} Booking - TripNexa`,
    description: `Review the ${itinerary.duration} ${destination.name} itinerary, timeline, and payment options before checkout.`,
  };
}

export default async function BookingPage(props: BookingPageProps) {
  const { id, itineraryId } = await props.params;
  const destination = getDestinationById(id);
  const itinerary = getItineraryById(id, itineraryId);
  const galleryImages = getDestinationGallery(id);

  if (!destination || !itinerary) {
    notFound();
  }

  const platformFee = 499;
  const taxes = Math.round(itinerary.totalPrice * 0.05);
  const payableNow = itinerary.totalPrice + platformFee + taxes;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#F7F4EE_0%,#FAFAF8_32%,#FAFAF8_100%)]">
      <Navbar />

      <section className="w-full px-4 py-12 md:px-6 md:py-14">
        <BookingHeroGallery
          destinationName={destination.name}
          images={galleryImages}
        />

        <div className="grid items-start gap-8 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-8">
            <section className="overflow-hidden rounded-[24px] border border-[#E6E1DA] bg-white shadow-[0_18px_45px_rgba(40,83,107,0.08)]">
              <div className="border-b border-[#EDE7DE] bg-[linear-gradient(135deg,#28536B_0%,#19384A_100%)] px-6 py-6 text-white md:px-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#F4DDB5]">
                      {itinerary.badge}
                    </span>
                    <h1 className="mt-3 text-3xl font-bold md:text-4xl">
                      {destination.name} {itinerary.title}
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm text-white/80 md:text-base">
                      {destination.tagline}
                    </p>
                  </div>

                  <div className="rounded-[18px] border border-white/20 bg-white/10 px-5 py-4 text-right backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/65">
                      Package
                    </p>
                    <p className="mt-2 text-2xl font-bold">{itinerary.duration}</p>
                    <p className="mt-1 text-sm text-white/80">{itinerary.stay}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 px-6 py-6 md:grid-cols-3 md:px-8">
                <div className="rounded-[18px] bg-[#F8F5F0] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A6A55]">
                    Starting at
                  </p>
                  <p className="mt-2 text-2xl font-bold text-[#0A1E2A]">
                    {formatInr(itinerary.pricePerPerson)}
                  </p>
                  <p className="mt-1 text-sm text-[#52636F]">per adult</p>
                </div>
                <div className="rounded-[18px] bg-[#F8F5F0] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A6A55]">
                    Ideal for
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#0A1E2A]">
                    Couples, families, and small groups
                  </p>
                </div>
                <div className="rounded-[18px] bg-[#F8F5F0] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A6A55]">
                    Includes
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#0A1E2A]">
                    Stay, transfers, and guided experiences
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-[24px] border border-[#E6E1DA] bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C2948A]">
                    Itinerary Timeline
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-[#28536B] md:text-3xl">
                    Your trip at a glance
                  </h2>
                </div>
                <p className="max-w-xl text-sm text-[#52636F]">
                  A simple day-wise flow so travelers know exactly how the journey unfolds before payment.
                </p>
              </div>

              <div className="mt-8 space-y-6">
                {itinerary.timeline.map((stop, index) => (
                  <div
                    key={`${stop.time}-${stop.title}`}
                    className="grid gap-4 md:grid-cols-[140px_36px_1fr]"
                  >
                    <div className="pt-1 text-sm font-semibold text-[#28536B]">
                      {stop.time}
                    </div>

                    <div className="relative flex justify-center">
                      <span className="relative z-10 mt-1 h-4 w-4 rounded-full border-4 border-[#D7B48A] bg-[#28536B]" />
                      {index < itinerary.timeline.length - 1 ? (
                        <span className="absolute top-5 h-[calc(100%+20px)] w-px bg-[#D9C9B8]" />
                      ) : null}
                    </div>

                    <div className="rounded-[18px] border border-[#EFE8DF] bg-[#FCFBF8] p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                        {stop.image ? (
                          <div className="relative h-24 overflow-hidden rounded-[12px] sm:h-20 sm:w-20 sm:shrink-0">
                            <Image
                              src={stop.image.src}
                              alt={stop.image.alt}
                              fill
                              sizes="(max-width: 640px) 100vw, 80px"
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                          </div>
                        ) : null}

                        <div className="min-w-0">
                          <h3 className="text-lg font-bold text-[#0A1E2A]">
                            {stop.title}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-[#52636F]">
                            {stop.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-[24px] border border-[#E6E1DA] bg-white p-6 shadow-[0_18px_45px_rgba(40,83,107,0.08)] lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C2948A]">
              Payment Options
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#28536B]">
              Proceed to payment
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#52636F]">
              Review the amount below and continue with your preferred payment method.
            </p>

            <div className="mt-6 rounded-[18px] bg-[#F8F5F0] p-5">
              <div className="flex items-center justify-between text-sm text-[#52636F]">
                <span>Package total</span>
                <span className="font-semibold text-[#0A1E2A]">
                  {formatInr(itinerary.totalPrice)}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-[#52636F]">
                <span>Taxes & fees</span>
                <span className="font-semibold text-[#0A1E2A]">
                  {formatInr(taxes + platformFee)}
                </span>
              </div>
              <div className="mt-4 border-t border-[#E4DACE] pt-4">
                <div className="flex items-end justify-between gap-4">
                  <span className="text-sm font-semibold uppercase tracking-[0.14em] text-[#8A6A55]">
                    Payable now
                  </span>
                  <span className="text-3xl font-bold text-[#0A1E2A]">
                    {formatInr(payableNow)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {itinerary.paymentOptions.map((option) => (
                <div
                  key={option}
                  className="flex items-center justify-between rounded-[14px] border border-[#EAE2D8] px-4 py-3"
                >
                  <span className="text-sm font-medium text-[#0A1E2A]">{option}</span>
                  <span className="rounded-full bg-[#EAF1F5] px-2.5 py-1 text-xs font-semibold text-[#28536B]">
                    Available
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-[14px] bg-[#D28B33] px-5 py-3.5 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#B97628]"
            >
              Proceed to Payment
            </button>

            <p className="mt-3 text-center text-xs leading-5 text-[#7A8892]">
              Secure checkout preview. Payment gateway integration can be connected next.
            </p>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
