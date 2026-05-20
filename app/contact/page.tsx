import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/app/contact/_components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us - TripNexa",
  description:
    "Reach out to TripNexa for booking help, itinerary customisation, and travel support.",
};

const infoItems = [
  { label: "SUPPORT LINE", value: "+91 98765 43210" },
  { label: "EMAIL", value: "hello@trytripnexa.com" },
  { label: "HOURS", value: "Mon–Sat, 9 AM – 7 PM IST" },
];

const infoCards = [
  {
    title: "Booking Requests",
    body: "For new bookings, package customisation and group travel enquiries.",
  },
  {
    title: "General Assistance",
    body: "Questions about destinations, itineraries or travel requirements.",
  },
  {
    title: "Direct Support",
    body: "Speak to a travel expert directly on +91 98765 43210.",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gray-900 px-6 py-24 text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-orange-300">
          Contact Us
        </p>
        <h1 className="mx-auto max-w-2xl font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight text-white md:text-5xl">
          We&apos;re here to help you plan the perfect trip
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/70">
          Reach out for booking assistance, itinerary customisation, or any
          travel queries.
        </p>
      </section>

      {/* Contact card — overlaps hero */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="-mt-16 overflow-hidden rounded-2xl shadow-2xl lg:grid lg:grid-cols-[380px_1fr]">
          {/* Left info panel */}
          <aside className="bg-gray-800 px-10 py-12 text-white">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white">
              Get in touch
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Our travel experts are available to answer your questions and help
              you design your ideal Gujarat experience.
            </p>

            <hr className="my-8 border-white/20" />

            <div className="space-y-6">
              {infoItems.map((item) => (
                <div key={item.label}>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-base font-medium text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </aside>

          {/* Right form panel */}
          <div className="bg-white px-10 py-12">
            <h2 className="mb-6 font-[family-name:var(--font-playfair)] text-2xl font-bold text-gray-900">
              Send us a message
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Info cards */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {infoCards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm"
            >
              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-gray-900">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
