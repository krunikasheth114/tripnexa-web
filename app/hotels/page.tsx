import Link from "next/link";
import Layout from "@/components/Layout";

export default function HotelsPage() {
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
            Hotels
          </h1>

          {/* Subheading */}
          <p className="text-zinc-400 text-lg leading-relaxed">
            We&apos;re curating the best stays across Gujarat
          </p>

          {/* Description */}
          <p className="text-zinc-500 text-base leading-relaxed max-w-sm">
            Handpicked hotels, resorts, and heritage stays — from luxury
            properties to boutique escapes. Launching soon.
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
