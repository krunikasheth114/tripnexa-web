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
      className="group relative block overflow-hidden rounded-2xl cursor-pointer h-[380px] hover:shadow-2xl transition-shadow duration-300"
    >
      <Image
        src={image}
        alt={`${name} - ${tagline}`}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, 25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

      <span className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
        {category}
      </span>

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-orange-200 text-xs font-semibold uppercase tracking-[0.15em] mb-1">
          {category}
        </p>
        <h3 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-white">
          {name}
        </h3>
        <p className="text-sm text-white/70 mt-1 line-clamp-2">{tagline}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-orange-300 text-sm font-semibold group-hover:text-white transition-colors">
          Explore &rarr;
        </span>
      </div>
    </Link>
  );
}
