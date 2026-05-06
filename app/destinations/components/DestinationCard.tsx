import Image from "next/image";
import Link from "next/link";

interface DestinationCardProps {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  image: string;
  category: string;
}

export default function DestinationCard({
  id,
  name,
  tagline,
  image,
  category,
}: DestinationCardProps) {
  return (
    <Link
      href={`/destinations/${id}`}
      className="group relative block overflow-hidden rounded-[8px] cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-72 overflow-hidden">
        <Image
          src={image}
          alt={`${name} - ${tagline}`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <span className="absolute top-4 right-4 bg-[#C2948A] text-white text-xs font-semibold px-3 py-1 rounded-[8px]">
          {category}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="text-sm text-gray-300 mt-1">{tagline}</p>
        <span className="mt-3 inline-block text-[#C2948A] text-sm font-semibold hover:text-white transition-colors duration-200">
          Explore &rarr;
        </span>
      </div>
    </Link>
  );
}
