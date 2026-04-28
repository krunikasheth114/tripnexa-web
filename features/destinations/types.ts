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
