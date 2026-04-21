import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { heroImage } from "@/utils/mockData";

export const metadata: Metadata = {
  title: "Contact Us - TripNexa",
  description:
    "For e-ticket, cancellation, and refund status requests, use Manage My Bookings. For any other query, contact our 24X7 Customer Support Team.",
};

const contactHighlights = [
  "For E-Tickets, cancellations, and refund status, use the Manage My Bookings feature on our Customer Support page.",
  "For any other assistance, our 24X7 Customer Support Team is available to help you.",
  "In case of any query, please contact our Customer Support Team on 0124-6280407.",
];

const quickDetails = [
  { label: "Support Line", value: "0124-6280407" },
  { label: "Support Hours", value: "24X7 Customer Support" },
  { label: "Primary Email", value: "hello@tripnexa.com" },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <Navbar />

      <section className="relative isolate overflow-visible">
        <div className="relative min-h-[520px]">
          <Image
            src={heroImage}
            alt="Scenic landscape inspiring your next Gujarat trip"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,37,48,0.88),rgba(40,83,107,0.72),rgba(194,148,138,0.35))]" />
          <div className="absolute inset-0 bg-black/20" />

          <div className="relative mx-auto flex min-h-[520px] max-w-6xl items-center px-6 pb-36 pt-16">
            <div className="max-w-2xl text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#E8C7BF]">
                Customer Support
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Contact Us for booking help and support queries
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/78 sm:text-lg">
                For E-Tickets, cancellations, and refund status updates, please
                use Manage My Bookings on the Customer Support page. For any
                other query, contact our 24X7 support team at 0124-6280407.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto -mt-16 max-w-6xl px-6 pb-8 lg:-mt-24">
          <div className="grid gap-0 overflow-hidden rounded-[28px] border border-white/40 bg-white shadow-[0_40px_120px_rgba(18,36,46,0.18)] lg:grid-cols-[0.92fr_1.08fr]">
            <aside className="relative overflow-hidden bg-[#28536B] px-6 py-8 text-white sm:px-8 sm:py-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(194,148,138,0.26),transparent_32%)]" />
              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#E8C7BF]">
                  Support Guidance
                </p>
                <h2 className="mt-4 max-w-sm text-3xl font-bold leading-tight">
                  Right channel for faster resolution
                </h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-white/75 sm:text-base">
                  Use the booking tools for booking-specific requests, and our
                  support team for everything else. This helps us resolve issues
                  quickly and accurately.
                </p>

                <ul className="mt-8 space-y-4">
                  {contactHighlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/12 text-[#F8D7CF]">
                        •
                      </span>
                      <span className="text-sm leading-7 text-white/82 sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 grid gap-4 rounded-[20px] border border-white/12 bg-white/8 p-5 backdrop-blur-sm">
                  {quickDetails.map((item) => (
                    <div key={item.label} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                      <p className="text-xs uppercase tracking-[0.28em] text-white/55">
                        {item.label}
                      </p>
                      <p className="mt-2 text-lg font-medium text-white">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <div className="bg-white p-2 sm:p-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-12">
        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-[20px] border border-[#E6E1DA] bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#C2948A]">
              Booking Related Requests
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              For E-Tickets, cancellations, and refund status, please use the
              Manage My Bookings feature on our Customer Support page.
            </p>
          </article>
          <article className="rounded-[20px] border border-[#E6E1DA] bg-[#F5F1EC] p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#28536B]">
              Other Assistance
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              For any other assistance, please contact our 24X7 Customer
              Support service and share your query details.
            </p>
          </article>
          <article className="rounded-[20px] border border-[#E6E1DA] bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#C2948A]">
              Direct Support Number
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              In case of any query, please contact our Customer Support Team on
              0124-6280407.
            </p>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
