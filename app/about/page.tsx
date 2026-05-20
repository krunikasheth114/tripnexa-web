import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — TripNexa",
  description:
    "Learn about TripNexa, Gujarat's trusted travel platform for seamless, memorable, and stress-free journeys.",
};

// ── Icons ─────────────────────────────────────────────────────────────────────

function IconMap() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
    </svg>
  );
}

function IconHeadset() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
    </svg>
  );
}

function IconTag() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L9.568 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
  );
}

function IconCompass() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  );
}

const features = [
  { icon: <IconMap />, title: "Curated Itineraries", body: "Every route is designed by Gujarat experts for authentic, stress-free exploration." },
  { icon: <IconHeadset />, title: "24/7 Support", body: "Our travel team is always a call away — before, during, and after your trip." },
  { icon: <IconTag />, title: "Best Value Pricing", body: "Transparent pricing with zero hidden fees — just great experiences." },
  { icon: <IconCompass />, title: "Local Expertise", body: "Deep roots in Gujarat — our guides know every hidden gem and story." },
  { icon: <IconBolt />, title: "Fast Booking", body: "Book in minutes. Instant confirmation for most packages." },
  { icon: <IconHeart />, title: "Personalised Trips", body: "We shape every itinerary around your interests and travel style." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="px-6 py-24 text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-orange-500">
          About TripNexa
        </p>
        <h1 className="mx-auto max-w-3xl font-[family-name:var(--font-playfair)] text-5xl font-bold leading-[1.1] text-gray-900 md:text-6xl">
          We Make Gujarat<br />Unforgettable
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
          TripNexa was built by travellers who fell in love with Gujarat. Our
          mission is to craft deeply personal, thoughtfully designed journeys
          that connect you to the real soul of this incredible state.
        </p>
      </section>

      {/* ── What We Do ───────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center font-[family-name:var(--font-playfair)] text-4xl font-bold text-gray-900">
            What We Do
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feat) => (
              <article
                key={feat.title}
                className="rounded-2xl bg-white border border-gray-100 p-7 transition-shadow duration-200 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white">
                  {feat.icon}
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-gray-900">
                  {feat.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {feat.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Vision */}
          <article className="rounded-2xl border border-gray-200 bg-gray-50 p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-500">
              Our Vision
            </p>
            <h3 className="mt-3 font-[family-name:var(--font-playfair)] text-2xl font-bold text-gray-900">
              Gujarat, Seen Differently
            </h3>
            <p className="mt-4 text-base leading-relaxed text-gray-500">
              To be the most trusted name in Gujarat travel — inspiring
              travellers worldwide to discover the state&apos;s unmatched
              cultural depth, natural beauty, and warm hospitality.
            </p>
          </article>

          {/* Mission */}
          <article className="rounded-2xl bg-orange-500 p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-100">
              Our Mission
            </p>
            <h3 className="mt-3 font-[family-name:var(--font-playfair)] text-2xl font-bold text-white">
              Journeys That Matter
            </h3>
            <p className="mt-4 text-base leading-relaxed text-white/80">
              To craft travel experiences that are responsible, authentic, and
              genuinely memorable — where every rupee you spend supports local
              communities and preserves Gujarat&apos;s heritage.
            </p>
          </article>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="bg-gray-900 px-6 py-24 text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-orange-300">
          Ready to Explore?
        </p>
        <h2 className="mx-auto max-w-xl font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight text-white md:text-5xl">
          Start your Gujarat adventure today
        </h2>
        <Link
          href="/destinations"
          className="mt-10 inline-block rounded-full bg-orange-500 px-10 py-4 text-base font-semibold text-white transition-colors hover:bg-orange-600"
        >
          Browse All Packages
        </Link>
      </section>

      <Footer />
    </main>
  );
}
