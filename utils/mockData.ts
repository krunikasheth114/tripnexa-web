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

const KUTCH_PLACES_IMAGE = "/destinations/rann-of-kutch.jpg";

export const destinations: Destination[] = [
  {
    id: "statue-of-unity",
    name: "Statue of Unity",
    tagline: "The world's tallest statue, standing tall in the Narmada Valley.",
    image:
      "/destinations/statue-of-unity.jpg",
    category: "Heritage",
  },
  {
    id: "somnath-temple",
    name: "Somnath Temple",
    tagline: "One of the twelve Jyotirlingas on the sacred Arabian Sea coast.",
    image:
      "/destinations/somnath-temple.jpg",
    category: "Spiritual",
  },
  {
    id: "gir-national-park",
    name: "Gir National Park",
    tagline: "Home to the majestic Asiatic lions and untamed wilderness.",
    image:
      "/destinations/gir-national-park.jpg",
    category: "Wildlife",
  },
  {
    id: "dwarka",
    name: "Dwarka",
    tagline: "Ancient coastal city known for Krishna heritage and temple trails.",
    image:
      "/destinations/dwarka.jpg",
    category: "Spiritual",
  },
  {
    id: "rann-of-kutch",
    name: "Rann of Kutch",
    tagline: "A surreal white desert that comes alive under the full moon.",
    image: KUTCH_PLACES_IMAGE,
    category: "Festivals",
  },
  {
    id: "saputara",
    name: "Saputara",
    tagline: "A cool hill retreat with lakeside viewpoints and monsoon charm.",
    image:
      "/destinations/saputara.jpg",
    category: "Adventure",
  },
  {
    id: "mandvi-beach",
    name: "Mandvi Beach",
    tagline: "Golden sands, calm waves, and sunsets along Gujarat's coast.",
    image:
      "/destinations/mandvi-beach.jpg",
    category: "Beaches",
  },
  {
    id: "polo-forest",
    name: "Polo Forest",
    tagline: "A hidden eco retreat of ruins, riverbeds, and lush green trails.",
    image:
      "/destinations/polo-forest.jpg",
    category: "Adventure",
  },
  {
    id: "champaner-pavagadh",
    name: "Champaner Pavagadh",
    tagline: "UNESCO-listed heritage with forts, stepwells, and hill shrines.",
    image:
      "/destinations/champaner-pavagadh.jpg",
    category: "Heritage",
  },
];

export const categories: string[] = [
  "All",
  "Heritage",
  "Wildlife",
  "Festivals",
  "Beaches",
  "Adventure",
  "Spiritual",
];

export const heroImage = "/hero/gujarat-hero.jpg";

const durationTemplates: Omit<
  ItineraryPlan,
  "id" | "pricePerPerson" | "totalPrice"
>[] = [
  {
    title: "Quick Escape",
    duration: "2D/1N",
    stay: "1 Night Stay",
    badge: "TripNexa Select",
    highlights: ["3 Star Hotel", "Airport/Station Pickup", "Breakfast Included", "1 Local Sightseeing Tour"],
    specialNote: "Perfect for a short weekend plan.",
    timeline: [
      {
        time: "Day 1 Morning",
        title: "Arrival and hotel check-in",
        description:
          "Meet your local transfer, settle into your stay, and take time to refresh before heading out.",
      },
      {
        time: "Day 1 Evening",
        title: "Signature local sightseeing",
        description:
          "Cover the destination's headline attraction with a relaxed guided visit and evening free time.",
      },
      {
        time: "Day 2 Morning",
        title: "Breakfast and departure",
        description:
          "Enjoy breakfast, complete checkout, and transfer back with a short stop for photos or shopping if time allows.",
      },
    ],
    paymentOptions: ["UPI", "Credit Card", "Net Banking"],
  },
  {
    title: "Classic Explorer",
    duration: "5D/4N",
    stay: "4 Night Stay",
    badge: "TripNexa Premium",
    highlights: ["4 Star Hotel", "Pickup & Drop", "Breakfast + Dinner", "3 Guided Activities"],
    specialNote: "Best value for families and couples.",
    timeline: [
      {
        time: "Day 1",
        title: "Arrival, transfer, and orientation",
        description:
          "Airport or station pickup, hotel check-in, and an easy first evening with a welcome briefing.",
      },
      {
        time: "Day 2",
        title: "Core landmark exploration",
        description:
          "Spend the day visiting the destination's must-see highlights with guided support and meal breaks.",
      },
      {
        time: "Day 3",
        title: "Immersive activity day",
        description:
          "Take part in curated local experiences, scenic stops, and optional cultural moments tailored to the destination.",
      },
      {
        time: "Day 4",
        title: "Flexible leisure and local discoveries",
        description:
          "Keep the pace light with free time, shopping, cafes, or an optional add-on experience.",
      },
      {
        time: "Day 5",
        title: "Breakfast and return transfer",
        description:
          "Wrap up the trip with checkout, transfer assistance, and smooth departure support.",
      },
    ],
    paymentOptions: ["UPI", "Credit Card", "Debit Card", "EMI"],
  },
  {
    title: "Complete Experience",
    duration: "7D/6N",
    stay: "6 Night Stay",
    badge: "TripNexa Signature",
    highlights: ["4/5 Star Hotel", "Private Transfers", "Selected Meals", "Daily Experiences + Excursions"],
    specialNote: "Most popular for a full destination experience.",
    timeline: [
      {
        time: "Day 1",
        title: "Arrival and premium transfer",
        description:
          "Private pickup, priority check-in support, and time to settle into your hotel at an easy pace.",
      },
      {
        time: "Day 2",
        title: "Top attractions circuit",
        description:
          "Visit the destination's most iconic spots with guided storytelling, transport, and curated breaks.",
      },
      {
        time: "Day 3",
        title: "Culture and cuisine trail",
        description:
          "Explore local neighborhoods, markets, and food experiences that bring the place to life.",
      },
      {
        time: "Day 4",
        title: "Excursion day",
        description:
          "Head out for a longer scenic excursion with stops selected for views, history, or nature.",
      },
      {
        time: "Day 5",
        title: "Adventure or relaxation",
        description:
          "Choose a more active day or keep it slow with spa, resort time, or curated independent exploration.",
      },
      {
        time: "Day 6",
        title: "Signature evening experience",
        description:
          "Enjoy a memorable final-night plan such as a sunset outing, performance, or private dinner setup.",
      },
      {
        time: "Day 7",
        title: "Departure support",
        description:
          "Breakfast, checkout assistance, and comfortable transfer for your return journey.",
      },
    ],
    paymentOptions: ["UPI", "Credit Card", "Net Banking", "EMI", "Pay Later"],
  },
];

const destinationBasePrice: Record<string, number> = {
  "statue-of-unity": 6900,
  "somnath-temple": 6200,
  "gir-national-park": 7600,
  dwarka: 6400,
  "rann-of-kutch": 8100,
  saputara: 7100,
  "mandvi-beach": 6600,
  "polo-forest": 6800,
  "champaner-pavagadh": 6300,
};

const destinationMultiplier = [1, 1.8, 2.4];

const destinationGalleryMap: Record<string, DestinationGalleryImage[]> = {
  "statue-of-unity": [
    {
      src: "/gallery/statue-of-unity/viewing-gallery-view.jpg",
      alt: "Statue of Unity glowing at sunset",
      label: "Viewing Gallery View",
    },
    {
      src: "/gallery/statue-of-unity/stay.jpg",
      alt: "Premium hotel room with warm lighting",
      label: "Stay",
    },
    {
      src: "/gallery/statue-of-unity/laser-show.jpg",
      alt: "Evening light and laser-style show atmosphere",
      label: "Laser Show",
    },
    {
      src: "/gallery/statue-of-unity/narmada-river.jpg",
      alt: "Riverfront landscape with lush surroundings",
      label: "Narmada River",
    },
    {
      src: "/gallery/statue-of-unity/local-food.jpg",
      alt: "Curated local food spread",
      label: "Local Food",
    },
    {
      src: "/gallery/statue-of-unity/experience.jpg",
      alt: "Travelers exploring a scenic walkway",
      label: "Experience",
    },
    {
      src: "/gallery/statue-of-unity/valley-views.jpg",
      alt: "Nature landscape with water and hills",
      label: "Valley Views",
    },
    {
      src: "/gallery/statue-of-unity/room-details.jpg",
      alt: "Resort-style room prepared for guests",
      label: "Room Details",
    },
    {
      src: "/gallery/statue-of-unity/evening-moments.jpg",
      alt: "Nighttime celebration atmosphere",
      label: "Evening Moments",
    },
    {
      src: "/gallery/statue-of-unity/scenic-outlook.jpg",
      alt: "Panoramic view across a dramatic landscape",
      label: "Scenic Outlook",
    },
  ],
};

const itineraryTimelineOverrides: Record<
  string,
  Partial<Record<ItineraryPlan["duration"], ItineraryPlan["timeline"]>>
> = {
  "statue-of-unity": {
    "2D/1N": [
      {
        time: "Day 01 Morning",
        title: "Arrival and luxury check-in",
        description:
          "Pickup from the nearest station or airport, a welcome drink on arrival, and smooth check-in at your premium stay before the first outing.",
        image: {
          src: "/package/statue-of-unity/arrival-stay.jpg",
          alt: "Luxury resort-style room prepared for arrival",
        },
      },
      {
        time: "Day 01 Evening",
        title: "Signature Statue of Unity sunset visit",
        description:
          "Head to the riverfront for a cinematic view of the Statue of Unity as the evening light shifts and the promenade comes alive.",
        image: {
          src: "/package/statue-of-unity/sunset-visit.jpg",
          alt: "Statue of Unity during a colorful sunset",
        },
      },
      {
        time: "Day 02 Morning",
        title: "Gujarati breakfast and departure",
        description:
          "Start with a feel-good breakfast spread, complete checkout, and leave with a relaxed transfer for your onward journey.",
        image: {
          src: "/package/statue-of-unity/breakfast-departure.jpg",
          alt: "Traditional breakfast spread in warm morning light",
        },
      },
    ],
  },
  "rann-of-kutch": {
    "2D/1N": [
      {
        time: "Day 01 Morning",
        title: "Arrival and Bhunga stay check-in",
        description:
          "Pickup from Bhuj Railway Station or Airport and transfer to your traditional Bhunga stay for an authentic Kutch welcome.",
      },
      {
        time: "Day 01 Afternoon",
        title: "Kalo Dungar viewpoint visit",
        description:
          "Head to Kalo Dungar, the Black Hill, for sweeping panoramic views over the Great Rann and nearby villages.",
      },
      {
        time: "Day 01 Evening",
        title: "Sunset at the White Desert",
        description:
          "Experience the White Rann at golden hour as the salt crystals shift tone with the setting sun.",
      },
      {
        time: "Day 01 Night",
        title: "Dinner with folk performances",
        description:
          "Enjoy a local dinner paired with Kutchi folk music and cultural performances at your stay.",
      },
      {
        time: "Day 02 Morning",
        title: "Bhuj heritage visit",
        description:
          "After breakfast, visit Aina Mahal or Prag Mahal in Bhuj for a quick look into Kutch's royal history.",
      },
      {
        time: "Day 02 Afternoon",
        title: "Ajrakh and embroidery shopping",
        description:
          "Stop for local shopping featuring Ajrakh prints, handcrafted textiles, and Kutchi embroidery before departure.",
      },
      {
        time: "Day 02 Evening",
        title: "Return drop-off",
        description:
          "Transfer back to Bhuj Railway Station or Airport for your onward journey.",
      },
    ],
    "5D/4N": [
      {
        time: "Day 01 Morning",
        title: "Arrival in Bhuj and transfer to stay",
        description:
          "Meet your driver at Bhuj Airport or Railway Station and check into your desert stay with time to relax.",
      },
      {
        time: "Day 01 Evening",
        title: "White Rann sunset and welcome dinner",
        description:
          "Start with a sunset visit to the White Desert followed by dinner and a warm orientation to the Kutch region.",
      },
      {
        time: "Day 02 Morning",
        title: "Kalo Dungar and nearby villages",
        description:
          "Visit Kalo Dungar for desert views and continue to nearby artisan villages known for leatherwork and weaving.",
      },
      {
        time: "Day 02 Evening",
        title: "Cultural performance night",
        description:
          "Return for a relaxed evening of local cuisine and live folk music under the open sky.",
      },
      {
        time: "Day 03 Morning",
        title: "Bhuj heritage trail",
        description:
          "Explore Bhuj attractions such as Aina Mahal, Prag Mahal, and Hamirsar Lake with guided context.",
      },
      {
        time: "Day 03 Afternoon",
        title: "Local market and craft shopping",
        description:
          "Spend time in Bhuj markets for Ajrakh prints, bandhani, and Kutchi embroidery shopping.",
      },
      {
        time: "Day 04 Full Day",
        title: "Leisure and optional experiences",
        description:
          "Keep the day flexible for photography, camel cart rides, village visits, or extra time at the salt flats.",
      },
      {
        time: "Day 05 Morning",
        title: "Breakfast and checkout",
        description:
          "Enjoy a final breakfast, complete checkout, and prepare for departure at an easy pace.",
      },
      {
        time: "Day 05 Afternoon",
        title: "Drop-off in Bhuj",
        description:
          "Private transfer back to Bhuj for your return train or flight.",
      },
    ],
    "7D/6N": [
      {
        time: "Day 01 Morning",
        title: "Arrival and premium transfer",
        description:
          "Arrive in Bhuj and enjoy a smooth private transfer to your premium desert stay with welcome refreshments.",
      },
      {
        time: "Day 01 Evening",
        title: "White Desert sunset experience",
        description:
          "Witness your first sunset across the salt flats followed by a curated regional dinner.",
      },
      {
        time: "Day 02 Morning",
        title: "Kalo Dungar and panoramic circuit",
        description:
          "Take in elevated views from Kalo Dungar and stop at scenic points around the Great Rann.",
      },
      {
        time: "Day 02 Afternoon",
        title: "Handicraft village immersion",
        description:
          "Visit artisan settlements to see weaving, embroidery, bell making, and lacquer craft traditions up close.",
      },
      {
        time: "Day 03 Morning",
        title: "Bhuj palaces and museums",
        description:
          "Explore Aina Mahal, Prag Mahal, and other heritage landmarks that reflect Kutch's royal and colonial-era history.",
      },
      {
        time: "Day 03 Evening",
        title: "Cultural dining experience",
        description:
          "Enjoy an evening featuring Kutchi cuisine, live performance, and storytelling rooted in the region's traditions.",
      },
      {
        time: "Day 04 Full Day",
        title: "Excursion and photography day",
        description:
          "Spend the day exploring lesser-known desert stretches, seasonal viewpoints, and scenic photography spots.",
      },
      {
        time: "Day 05 Morning",
        title: "Mandvi or nearby coastal extension",
        description:
          "Take an optional excursion toward Mandvi-side heritage and coastal sights for a change of landscape.",
      },
      {
        time: "Day 05 Evening",
        title: "Resort leisure and private time",
        description:
          "Slow the pace with flexible resort time, spa, or a private sunset setup depending on your preference.",
      },
      {
        time: "Day 06 Morning",
        title: "Shopping and final local discoveries",
        description:
          "Use the day for curated shopping, local food stops, and any missed craft experiences around Bhuj.",
      },
      {
        time: "Day 06 Night",
        title: "Signature farewell evening",
        description:
          "Wrap up with a memorable final-night setup featuring music, regional flavors, and desert ambience.",
      },
      {
        time: "Day 07 Morning",
        title: "Breakfast and departure support",
        description:
          "Checkout after breakfast and take your return transfer to Bhuj Airport or Railway Station.",
      },
    ],
  },
};

export function getDestinationById(id: string): Destination | undefined {
  return destinations.find((destination) => destination.id === id);
}

export function getDestinationGallery(id: string): DestinationGalleryImage[] {
  const destination = getDestinationById(id);
  if (!destination) {
    return [];
  }

  return (
    destinationGalleryMap[id] ?? [
      {
        src: destination.image,
        alt: `${destination.name} hero view`,
        label: destination.name,
      },
      {
        src: "/package/common/stay.jpg",
        alt: "Premium hotel stay",
        label: "Stay",
      },
      {
        src: "/package/common/experience.jpg",
        alt: "Destination experience",
        label: "Experience",
      },
      {
        src: "/package/common/nature.jpg",
        alt: "Destination nature view",
        label: "Nature",
      },
      {
        src: "/package/common/local-food.jpg",
        alt: "Local food and culture",
        label: "More",
      },
    ]
  );
}

export function getItinerariesByDestination(id: string): ItineraryPlan[] {
  const basePrice = destinationBasePrice[id] ?? 6500;
  const timelineOverrides = itineraryTimelineOverrides[id] ?? {};

  return durationTemplates.map((template, index) => {
    const pricePerPerson = Math.round(basePrice * destinationMultiplier[index]);
    const totalPrice = pricePerPerson * 2;

    return {
      ...template,
      timeline: timelineOverrides[template.duration] ?? template.timeline,
      id: `${id}-${template.duration.toLowerCase().replace("/", "-")}`,
      pricePerPerson,
      totalPrice,
    };
  });
}

export function getItineraryById(
  destinationId: string,
  itineraryId: string
): ItineraryPlan | undefined {
  return getItinerariesByDestination(destinationId).find(
    (itinerary) => itinerary.id === itineraryId
  );
}
