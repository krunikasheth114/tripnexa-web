import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Layout from "@/components/Layout";
import PackageItineraryDetails from "./components/PackageItineraryDetails";
import { fetchPackageById } from "@/services/destinations";

type PackagePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  props: PackagePageProps
): Promise<Metadata> {
  const { id } = await props.params;
  const packageDetails = await fetchPackageById(id);

  if (!packageDetails) {
    return {
      title: "Package Not Found - TripNexa",
    };
  }

  return {
    title: `${packageDetails.title} Itinerary - TripNexa`,
    description:
      packageDetails.description ??
      `View the ${packageDetails.days} days ${packageDetails.nights} nights package itinerary.`,
  };
}

export default async function PackageDetailsPage(props: PackagePageProps) {
  const { id } = await props.params;
  const packageDetails = await fetchPackageById(id);

  if (!packageDetails) {
    notFound();
  }

  return (
    <Layout>
      <PackageItineraryDetails packageDetails={packageDetails} />
    </Layout>
  );
}
