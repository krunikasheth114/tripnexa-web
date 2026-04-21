import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — TripNexa",
  description:
    "Learn about TripNexa, our mission, vision, and our promise to make every journey simple, smart, and stress-free.",
};

/** Inline SVG icons used in the "What We Do" feature cards */
function IconBolt() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.75}
      stroke="currentColor"
      className="w-6 h-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
      />
    </svg>
  );
}

function IconMap() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.75}
      stroke="currentColor"
      className="w-6 h-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
      />
    </svg>
  );
}

function IconHeadset() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.75}
      stroke="currentColor"
      className="w-6 h-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
      />
    </svg>
  );
}

function IconTag() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.75}
      stroke="currentColor"
      className="w-6 h-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L9.568 3z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 6h.008v.008H6V6z"
      />
    </svg>
  );
}

function IconCompass() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.75}
      stroke="currentColor"
      className="w-6 h-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
      />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.75}
      stroke="currentColor"
      className="w-6 h-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );
}

/** Single feature card for the "What We Do" grid */
interface FeatureCardProps {
  icon: React.ReactNode;
  text: string;
}

function FeatureCard({ icon, text }: FeatureCardProps) {
  return (
    <article className="bg-white rounded-[8px] shadow-sm border border-gray-100 p-6 flex items-start gap-4 hover:shadow-md transition-shadow duration-200">
      <span className="text-[#28536B] mt-0.5 shrink-0">{icon}</span>
      <p className="text-gray-600 text-base leading-relaxed">{text}</p>
    </article>
  );
}

/** Checkmark icon used in bullet lists */
function IconCheck() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      className="w-5 h-5 shrink-0"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

const features: { icon: React.ReactNode; text: string }[] = [
  { icon: <IconBolt />, text: "Simplify travel planning using smart technology" },
  { icon: <IconMap />, text: "Provide clear, structured, and easy-to-follow itineraries" },
  { icon: <IconHeadset />, text: "Offer real-time support before and during your trip" },
  { icon: <IconTag />, text: "Ensure transparent pricing with no hidden surprises" },
  { icon: <IconCompass />, text: "Help you explore better, not just travel more" },
  { icon: <IconHeart />, text: "We blend technology, simplicity, and human care" },
];

const whyPoints = [
  "Making travel easy to plan",
  "Making journeys stress-free to experience",
  "Giving you the confidence to travel without worry",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <Navbar />

      {/* ── Section 1: Hero / Intro ───────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#28536B] mb-6">
          About TripNexa
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          At TripNexa, we believe travel should be exciting — not stressful. In
          today&apos;s world, planning a trip often feels overwhelming. Too many
          options, unclear pricing, and lack of real support can turn a simple
          journey into a complicated task. That&apos;s exactly the problem we
          set out to solve. TripNexa is a next-generation, technology-driven
          travel platform built to make your travel planning easy, smart, and
          completely stress-free. We combine intelligent tools with real human
          support to simplify every step of your journey — from discovering
          destinations to planning itineraries and managing your trip. Whether
          you&apos;re a solo traveler, a couple, or a group of friends, TripNexa
          ensures that your experience is smooth, transparent, and enjoyable.
        </p>
      </section>

      {/* ── Section 2: What We Do ────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#28536B] mb-10 text-center">
            What We Do
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} icon={feature.icon} text={feature.text} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Why TripNexa ──────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-20">
        <h2 className="text-3xl font-bold text-[#28536B] mb-3">
          Why TripNexa?
        </h2>
        <p className="text-[#C2948A] font-semibold text-lg mb-8">
          Because we don&apos;t just book trips — we solve travel problems.
        </p>
        <ul className="space-y-4">
          {whyPoints.map((point) => (
            <li key={point} className="flex items-center gap-3 text-gray-600 text-lg">
              <span className="text-[#28536B]">
                <IconCheck />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Section 4: Vision & Mission ──────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vision */}
            <article className="bg-[#FAFAF8] rounded-[8px] border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow duration-200">
              <h3 className="text-[#C2948A] font-semibold text-sm uppercase tracking-widest mb-3">
                Our Vision
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become a trusted, next-generation travel platform that makes
                every journey simple, smart, and stress-free for everyone.
              </p>
            </article>

            {/* Mission */}
            <article className="bg-[#28536B] rounded-[8px] shadow-sm p-8 hover:shadow-md transition-shadow duration-200">
              <h3 className="text-[#C2948A] font-semibold text-sm uppercase tracking-widest mb-3">
                Our Mission
              </h3>
              <p className="text-white text-lg leading-relaxed">
                To use technology and personalized support to simplify travel
                planning, provide transparent and reliable experiences, and
                empower people to explore the world with confidence.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ── Section 5: Our Promise ───────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
        <h2 className="text-3xl font-bold text-[#28536B] mb-6">Our Promise</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          At TripNexa, we promise to make your journey effortless — so you can
          focus on creating memories, not managing plans.
        </p>
      </section>

      {/* ── Section 6: CTA ───────────────────────────────────────────── */}
      <section className="bg-[#28536B] py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Travel Smarter?
          </h2>
          <Link
            href="/"
            className="inline-block bg-white text-[#28536B] px-6 py-3 rounded-[8px] font-semibold hover:bg-[#FAFAF8] transition-colors duration-200"
          >
            Start Planning
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
