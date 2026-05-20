import Link from "next/link";
import Layout from "@/components/Layout";

export default function CarRentalsPage() {
  return (
    <Layout>
      <main className="bg-zinc-950 min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-lg mx-auto text-center flex flex-col items-center gap-6">
          {/* Coming Soon badge */}
          <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-[8px]">
            Coming Soon
          </span>

          {/* Heading */}
          <h1 className="font-[family-name:var(--font-playfair)] font-bold text-white text-4xl md:text-6xl leading-tight tracking-tight">
            Car Rentals
          </h1>

          {/* Subheading */}
          <p className="text-zinc-400 text-lg leading-relaxed">
            Explore Gujarat on your own terms
          </p>

          {/* Description */}
          <p className="text-zinc-500 text-base leading-relaxed max-w-sm">
            Comfortable, reliable cabs across Gujarat — from Ahmedabad to the
            Rann of Kutch. Launching soon.
          </p>

          {/* Divider */}
          <div className="w-16 h-px bg-white/10" />

          {/* Back to Home */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-white/15 text-white px-6 py-3 rounded-[8px] font-semibold hover:bg-white/5 transition-colors duration-200 text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Home
          </Link>
        </div>
      </main>
    </Layout>
  );
}
