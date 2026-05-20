import Image from "next/image";

interface SummerDestination {
  id: string;
  name: string;
  image: string;
}

const summerDestinations: SummerDestination[] = [
  {
    id: "paris",
    name: "Paris",
    image:
      "/summer/paris.jpg",
  },
  {
    id: "bali",
    name: "Bali",
    image:
      "/summer/bali.jpg",
  },
  {
    id: "swiss-alps",
    name: "Swiss Alps",
    image:
      "/summer/swiss-alps.jpg",
  },
  {
    id: "kyoto",
    name: "Kyoto",
    image:
      "/summer/kyoto.jpg",
  },
  {
    id: "maldives",
    name: "Maldives",
    image:
      "/summer/maldives.jpg",
  },
];

export default function SummerSpecialSection() {
  return (
    <section className="relative overflow-hidden bg-gray-900 px-6 py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.18),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold text-white md:text-5xl">
          Summer special holiday destination
        </h2>

        <div className="mt-10 overflow-x-auto pb-2">
          <div className="mx-auto flex w-max min-w-full gap-6 px-1">
            {summerDestinations.map((destination) => (
              <article
                key={destination.id}
                className="w-[170px] shrink-0 rounded-[24px] border border-white/10 bg-white/5 p-3 shadow-[0_18px_45px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative h-[150px] overflow-hidden rounded-[16px] border border-white/10">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover"
                    sizes="170px"
                  />
                </div>
                <p className="pt-4 text-center text-lg font-medium text-white">
                  {destination.name}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
