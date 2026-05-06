import apiClient from "@/lib/axios";

export interface ApiGallery {
  id: number;
  url: string;
  position: number;
  status?: string;
}

export interface ApiDestination {
  id: number;
  name: string;
  slug: string;
  type: string | null;
  description: string | null;
  status: string;
  gallery?: ApiGallery[];
}

export interface ApiPackageItinerary {
  id: number;
  dayNumber: number;
  dayTitle: string;
  description: string;
  activities: { title: string }[];
  status: string;
}

export interface ApiPackage {
  id: number;
  destinationId: number;
  title: string;
  price: number;
  discountPrice: number | null;
  days: number;
  nights: number;
  accommodationType: string | null;
  tags: string[];
  status: string;
  destination: ApiDestination;
  gallery: ApiGallery[];
  itineraries: ApiPackageItinerary[];
}

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  image: string;
  category: string;
}

export interface DestinationGalleryImage {
  src: string;
  alt: string;
  label?: string;
}

export interface ItineraryPlan {
  id: string;
  title: string;
  duration: string;
  stay: string;
  badge: string;
  highlights: string[];
  specialNote: string;
  pricePerPerson: number;
  originalPricePerPerson?: number;
  totalPrice: number;
  timeline: {
    time: string;
    title: string;
    description: string;
    image?: {
      src: string;
      alt: string;
    };
  }[];
  paymentOptions: string[];
}

export async function fetchDestinations(): Promise<ApiDestination[]> {
  try {
    const response = await apiClient.get<{ data: ApiDestination[] }>("/destinations");
    return response.data.data
  } catch {
    return [];
  }
}

export async function fetchPackagesByDestinationId(
  destinationId: string | number
): Promise<ApiPackage[]> {
  try {
    const response = await apiClient.get<{ data: ApiPackage[] }>("/packages", {
      params: { destinationId },
    });
    console.log("response",response);

    return response.data.data;
  } catch {
    return [];
  }
}

function toTitleCase(value: string | null): string {
  if (!value) {
    return "Other";
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getPackagePrice(item: ApiPackage): number {
  return item.discountPrice ?? item.price;
}

function getOriginalPackagePrice(item: ApiPackage): number | undefined {
  if (item.discountPrice === null || item.discountPrice >= item.price) {
    return undefined;
  }

  return item.price;
}

function mapPackageToItinerary(item: ApiPackage): ItineraryPlan {
  const duration = `${item.days}D/${item.nights}N`;
  const highlights = [
    item.accommodationType ? `${item.accommodationType} Stay` : "Comfortable Stay",
    ...item.tags.map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1)),
  ];

  return {
    id: String(item.id),
    title: item.title,
    duration,
    stay: `${item.nights} Night${item.nights === 1 ? "" : "s"} Stay`,
    badge: "TripNexa Select",
    highlights: highlights.slice(0, 4),
    specialNote: `${item.days} days package for ${item.destination.name}.`,
    pricePerPerson: getPackagePrice(item),
    originalPricePerPerson: getOriginalPackagePrice(item),
    totalPrice: getPackagePrice(item) * 2,
    timeline:
      item.itineraries.length > 0
        ? item.itineraries.map((itinerary) => ({
            time: `Day ${itinerary.dayNumber}`,
            title: itinerary.dayTitle,
            description: itinerary.description,
          }))
        : [
            {
              time: `${item.days} Days`,
              title: item.title,
              description:
                "Detailed day-wise itinerary will be shared by the TripNexa team.",
            },
          ],
    paymentOptions: ["UPI", "Credit Card", "Net Banking"],
  };
}

function mapPackageToDestination(item: ApiPackage): Destination {
  return {
    id: String(item.destination.id),
    name: item.destination.name,
    tagline:
      item.destination.description ??
      "Explore curated travel packages for this destination.",
    image: item.gallery[0]?.url ?? "/destinations/rann-of-kutch.jpg",
    category: toTitleCase(item.destination.type),
  };
}

function mapPackageToGallery(item: ApiPackage): DestinationGalleryImage[] {
  const packageImages = item.gallery
    .filter((image) => !image.status || image.status === "ACTIVE")
    .sort((first, second) => first.position - second.position)
    .map((image, index) => ({
      src: image.url,
      alt: `${item.title} gallery image ${index + 1}`,
      label: index === 0 ? "Package" : `View ${index + 1}`,
    }));

  if (packageImages.length > 0) {
    return packageImages;
  }

  return [
    {
      src: "/destinations/rann-of-kutch.jpg",
      alt: `${item.destination.name} package view`,
      label: item.destination.name,
    },
  ];
}

export async function getDestinationPageData(id: string) {
  const packages = await fetchPackagesByDestinationId(id);
  const firstPackage = packages[0];

  if (!firstPackage) {
    return null;
  }

  return {
    destination: mapPackageToDestination(firstPackage),
    itineraries: packages.map(mapPackageToItinerary),
  };
}

export async function getBookingPageData(
  destinationId: string,
  packageId: string
) {
  const packages = await fetchPackagesByDestinationId(destinationId);
  const selectedPackage = packages.find((item) => String(item.id) === packageId);

  if (!selectedPackage) {
    return null;
  }

  return {
    destination: mapPackageToDestination(selectedPackage),
    itinerary: mapPackageToItinerary(selectedPackage),
    galleryImages: mapPackageToGallery(selectedPackage),
  };
}
