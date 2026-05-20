import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPackageById } from "@/services/destinations";
import BookingReview from "./BookingReview";

type BookingRouteProps = {
  params: Promise<{ id: string; itineraryId: string }>;
};

export async function generateMetadata(
  props: BookingRouteProps
): Promise<Metadata> {
  const { itineraryId } = await props.params;
  const pkg = await fetchPackageById(itineraryId);

  return {
    title: pkg ? `Book ${pkg.title} — TripNexa` : "Booking — TripNexa",
    description: "Review your itinerary details and confirm your booking.",
  };
}

export default async function BookingPage(props: BookingRouteProps) {
  const { id, itineraryId } = await props.params;
  const packageDetails = await fetchPackageById(itineraryId);

  if (!packageDetails) {
    notFound();
  }

  return <BookingReview packageDetails={packageDetails} destinationId={id} />;
}
