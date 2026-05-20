"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LoginModal } from "@/app/_components/LoginModal";
import { useAppSelector } from "@/hooks/useAppDispatch";
import type { ApiPackage } from "@/services/destinations";

// ── Mirrors admin OPTION_GROUPS + FLAT_OPTIONS ─────────────────
const GROUPS = [
  {
    key: "meals", label: "Meals", icon: "🍽️",
    children: [
      { key: "breakfast", label: "Breakfast", icon: "🌅" },
      { key: "lunch",     label: "Lunch",     icon: "☀️" },
      { key: "dinner",    label: "Dinner",    icon: "🌙" },
    ],
  },
  {
    key: "accommodation", label: "Accommodation", icon: "🏨",
    children: [
      { key: "2-star", label: "2-Star Hotel", icon: "⭐⭐" },
      { key: "3-star", label: "3-Star Hotel", icon: "⭐⭐⭐" },
      { key: "4-star", label: "4-Star Hotel", icon: "⭐⭐⭐⭐" },
      { key: "5-star", label: "5-Star Hotel", icon: "⭐⭐⭐⭐⭐" },
    ],
  },
  {
    key: "transport", label: "Transfers & Transport", icon: "🚗",
    children: [
      { key: "private-cab", label: "Private Cab", icon: "🚙" },
      { key: "ac-bus",      label: "AC Bus",       icon: "🚌" },
      { key: "volvo-bus",   label: "Volvo Bus",    icon: "🚌" },
      { key: "train",       label: "Train",         icon: "🚆" },
      { key: "flight",      label: "Flight",        icon: "✈️" },
    ],
  },
];

const FLAT = [
  { key: "activities",       label: "Activities & Sightseeing", icon: "🎯" },
  { key: "entryFees",        label: "Entry Fees & Permits",     icon: "🎟️" },
  { key: "guide",            label: "Professional Guide",       icon: "🧭" },
  { key: "insurance",        label: "Travel Insurance",         icon: "🛡️" },
];

function buildChips(
  inc: Record<string, unknown> | null,
  exc: Record<string, unknown> | null
) {
  const included: string[] = [];
  const excluded: string[] = [];

  for (const g of GROUPS) {
    const incVal = inc?.[g.key];
    const excVal = exc?.[g.key];
    const hasAnyIncluded = Array.isArray(incVal) && incVal.length > 0;

    if (hasAnyIncluded) {
      // "🍽️ Meals (Breakfast)" or "🏨 Accommodation (3-Star Hotel)"
      const childLabels = (incVal as string[]).map((k) => {
        const c = g.children.find((ch) => ch.key === k);
        return c ? c.label : k;
      });
      included.push(`${g.icon} ${g.label} (${childLabels.join(", ")})`);
    } else if (Array.isArray(excVal) && excVal.length > 0) {
      // Whole group excluded — show parent only, no children
      excluded.push(`${g.icon} ${g.label}`);
    }
  }

  for (const opt of FLAT) {
    if (inc?.[opt.key] === true) included.push(`${opt.icon} ${opt.label}`);
    else if (exc?.[opt.key] === true) excluded.push(`${opt.icon} ${opt.label}`);
  }

  return { included, excluded };
}

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh",
];

interface BookingReviewProps {
  packageDetails: ApiPackage;
  destinationId: string;
}

export default function BookingReview({ packageDetails, destinationId }: BookingReviewProps) {
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const [guestCount, setGuestCount] = useState(2);
  const [fromState, setFromState] = useState("");
  const [stateOpen, setStateOpen] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  function handleConfirmBook() {
    if (!isAuthenticated) {
      setLoginModalOpen(true);
      return;
    }
    // TODO: proceed with booking flow
    alert("Booking confirmed! (integration pending)");
  }

  const basePrice = packageDetails.discountPrice ?? packageDetails.price;
  const hasDiscount =
    packageDetails.discountPrice !== null &&
    packageDetails.discountPrice !== undefined &&
    packageDetails.discountPrice < packageDetails.price;

  const pricing = useMemo(() => {
    const perPerson = basePrice;
    const subtotal = perPerson * guestCount;
    const stateTransport = fromState && fromState !== "Gujarat" ? 1200 : 0;
    const earlyDiscount = hasDiscount
      ? Math.round((packageDetails.price - (packageDetails.discountPrice ?? 0)) * guestCount)
      : 0;
    const couponDiscount = couponApplied ? 500 : 0;
    const subtotalBeforeGst = subtotal + stateTransport;
    const gst = Math.round(subtotalBeforeGst * 0.05);
    const serviceFee = 500;
    const total = subtotalBeforeGst + gst + serviceFee - earlyDiscount - couponDiscount;
    return { perPerson, subtotal, stateTransport, gst, serviceFee, earlyDiscount, couponDiscount, total };
  }, [basePrice, guestCount, fromState, hasDiscount, packageDetails, couponApplied]);

  const heroImage = packageDetails.gallery?.[0]?.url || "/package/common/experience.jpg";
  const destinationLabel = packageDetails.destination?.name
    ? `${packageDetails.destination.name}, Gujarat`
    : "Gujarat, India";

  // Accommodation from inclusions JSON
  const accKeys = packageDetails.inclusions?.accommodation as string[] | undefined;
  const accGroup = GROUPS.find((g) => g.key === "accommodation")!;
  const accLabel = accKeys?.length
    ? accKeys.map((k) => accGroup.children.find((c) => c.key === k)?.label ?? k).join(" / ")
    : null;

  // Inclusions / Exclusions from package JSON
  const { included, excluded } = buildChips(packageDetails.inclusions, packageDetails.exclusions);
  const hasIncEx = included.length > 0 || excluded.length > 0;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_420px]">
          {/* ── Left Column ───────────────────────────── */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <Link
                href={`/destinations/${destinationId}`}
                className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500 hover:text-gray-900 transition-colors"
              >
                ← Back to packages
              </Link>
              <h1 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-bold text-gray-900 md:text-4xl">
                Review Your Booking
              </h1>
              <p className="mt-1.5 text-sm text-gray-500">
                Please review your trip details before confirming
              </p>
            </div>

            {/* Trip Details */}
            <div className="rounded-2xl border border-gray-200 bg-white p-7">
              <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-gray-900">
                Trip Details
              </h2>
              <div className="mt-5 flex items-center justify-between">
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Duration</p>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span className="font-semibold text-gray-900">
                      {packageDetails.days} Days · {packageDetails.nights} Nights
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1 text-orange-500">
                  <div className="h-px w-10 bg-gray-200" />
                  <span className="text-xs font-medium">{packageDetails.nights} Nights</span>
                  <div className="h-px w-10 bg-gray-200" />
                </div>
                {accLabel && (
                  <div className="space-y-1.5 text-right">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Accommodation</p>
                    <p className="font-semibold text-gray-900">{accLabel}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Package Details */}
            <div className="rounded-2xl border border-gray-200 bg-white p-7">
              <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-gray-900">
                Package Details
              </h2>
              <div className="mt-5 flex gap-5">
                <div className="relative h-[120px] w-[140px] shrink-0 overflow-hidden rounded-xl bg-gray-200">
                  <Image
                    src={heroImage}
                    alt={packageDetails.title}
                    fill
                    className="object-cover"
                    sizes="140px"
                  />
                </div>
                <div className="space-y-2.5 flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-base leading-snug">
                    {packageDetails.title}
                  </h3>
                  {packageDetails.tags?.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {packageDetails.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {destinationLabel}
                  </div>
                  {packageDetails.description && (
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                      {packageDetails.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            {hasIncEx && (
              <div className="rounded-2xl border border-gray-200 bg-white p-7">
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-gray-900">
                  Inclusions &amp; Exclusions
                </h2>
                <div className="mt-5 grid grid-cols-2 gap-6">
                  {included.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-700">Included</p>
                      {included.map((item) => (
                        <div key={item} className="flex items-center gap-2.5">
                          <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-gray-900">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {excluded.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-red-700">Not Included</p>
                      {excluded.map((item) => (
                        <div key={item} className="flex items-center gap-2.5">
                          <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-gray-900">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Terms & Conditions */}
            <div className="rounded-2xl border border-gray-200 bg-white p-7">
              <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-gray-900">
                Terms &amp; Conditions
              </h2>
              <div className="mt-5 h-[200px] overflow-y-auto rounded-xl bg-gray-50 p-5 space-y-4">
                {[
                  "Cancellation Policy: Free cancellation up to 48 hours before check-in. Cancellations within 48 hours will incur a charge equal to the first night's stay.",
                  "Check-in time is 2:00 PM and check-out time is 11:00 AM. Early check-in and late check-out are subject to availability.",
                  "A valid government-issued photo ID is required at the time of check-in. The name on the ID must match the booking confirmation.",
                  "Payment is due in full at the time of booking. We accept all major credit cards, debit cards, and UPI payments.",
                  "The hotel reserves the right to pre-authorize the credit card prior to arrival. Additional charges for damages or extra services will be billed separately.",
                ].map((term, i) => (
                  <div key={i} className="flex gap-2.5">
                    <span className="shrink-0 text-sm font-semibold text-gray-900">{i + 1}.</span>
                    <p className="text-sm leading-relaxed text-gray-500">{term}</p>
                  </div>
                ))}
              </div>
              <label className="mt-4 flex cursor-pointer items-center gap-3">
                <div
                  onClick={() => setTermsAgreed(!termsAgreed)}
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                    termsAgreed ? "border-orange-500 bg-orange-500" : "border-gray-300 bg-white"
                  }`}
                >
                  {termsAgreed && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-900">
                  I agree to the Terms &amp; Conditions
                </span>
              </label>
            </div>
          </div>

          {/* ── Right Column ──────────────────────────── */}
          <div className="space-y-5">
            {/* Guest Details */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-gray-900">
                  Guest Details
                </h2>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-900">Full Name *</label>
                  <input type="text" placeholder="Enter your full name"
                    className="w-full h-11 rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-900">Email Address *</label>
                  <input type="email" placeholder="you@example.com"
                    className="w-full h-11 rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-900">Phone Number *</label>
                  <div className="flex h-11 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-colors">
                    <div className="flex items-center gap-2 border-r border-gray-200 px-3">
                      <span className="text-sm font-semibold text-gray-900">+91</span>
                    </div>
                    <input type="tel" placeholder="98765 43210"
                      className="flex-1 bg-transparent px-3 text-sm text-gray-900 placeholder-gray-400 outline-none" />
                  </div>
                </div>
                {/* From State */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-900">From State *</label>
                  <div className="relative">
                    <button type="button" onClick={() => setStateOpen(!stateOpen)}
                      className="w-full h-11 flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm transition-colors focus:border-orange-400">
                      <span className={fromState ? "text-gray-900" : "text-gray-400"}>
                        {fromState || "Select your state"}
                      </span>
                      <svg className={`w-4 h-4 text-gray-400 transition-transform ${stateOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {stateOpen && (
                      <div className="absolute z-20 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg max-h-52 overflow-y-auto">
                        {INDIAN_STATES.map((state) => (
                          <button key={state} type="button"
                            onClick={() => { setFromState(state); setStateOpen(false); }}
                            className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50 ${fromState === state ? "text-orange-600 font-medium" : "text-gray-900"}`}>
                            {state}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs italic text-gray-400">Price may vary based on your departure state</p>
                </div>
                {/* Guest Count */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-900">Number of Guests *</label>
                  <div className="flex h-11 overflow-hidden rounded-lg border border-gray-200">
                    <button type="button" onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      className="w-11 flex items-center justify-center border-r border-gray-200 bg-gray-50 text-gray-900 hover:bg-gray-100 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                      </svg>
                    </button>
                    <div className="flex-1 flex items-center justify-center gap-1.5 bg-gray-50">
                      <span className="text-base font-semibold text-gray-900">{guestCount}</span>
                      <span className="text-sm text-gray-500">Guests</span>
                    </div>
                    <button type="button" onClick={() => setGuestCount(Math.min(20, guestCount + 1))}
                      className="w-11 flex items-center justify-center border-l border-gray-200 bg-orange-500 text-white hover:bg-orange-600 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Breakup */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-2.5 mb-4">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 14H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v3M9 14l3 3 7-7" />
                </svg>
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-gray-900">Price Breakup</h2>
              </div>
              <div className="h-px bg-gray-200 mb-4" />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Base Price (per person)</span>
                  <span className="text-sm font-medium text-gray-900">₹{pricing.perPerson.toLocaleString()}</span>
                </div>
                {hasDiscount && (
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>MRP</span>
                    <span className="line-through">₹{packageDetails.price.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Guests (× {guestCount})</span>
                  <span className="text-sm font-medium text-gray-900">₹{pricing.subtotal.toLocaleString()}</span>
                </div>
                {pricing.stateTransport > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">State Transport ({fromState})</span>
                    <span className="text-sm font-medium text-gray-900">₹{pricing.stateTransport.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">GST (5%)</span>
                  <span className="text-sm font-medium text-gray-900">₹{pricing.gst.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Service Fee</span>
                  <span className="text-sm font-medium text-gray-900">₹{pricing.serviceFee.toLocaleString()}</span>
                </div>
                {pricing.earlyDiscount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-emerald-600">Early Bird Discount</span>
                    <span className="text-sm font-medium text-emerald-600">- ₹{pricing.earlyDiscount.toLocaleString()}</span>
                  </div>
                )}
                {couponApplied && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-emerald-600">Coupon (NEXA500)</span>
                    <span className="text-sm font-medium text-emerald-600">- ₹500</span>
                  </div>
                )}
              </div>
            </div>

            {/* Total */}
            <div className="rounded-2xl bg-orange-500 p-6">
              <p className="text-sm font-medium text-white/80">Total Amount</p>
              <div className="mt-3 flex items-end justify-between">
                <span className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white">
                  ₹{pricing.total.toLocaleString()}
                </span>
                <span className="text-sm text-white/75">for {guestCount} guest{guestCount > 1 ? "s" : ""}</span>
              </div>
              <div className="mt-4 h-px bg-white/20" />
              <p className="mt-3 text-xs text-white/60">Price auto-calculates based on guests &amp; state</p>
            </div>

            {/* Coupon */}
            <div className="flex gap-2">
              <input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-1 h-11 rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-orange-400 transition-colors" />
              <button type="button"
                onClick={() => { if (coupon.trim().toUpperCase() === "NEXA500") setCouponApplied(true); }}
                disabled={couponApplied}
                className="h-11 rounded-lg border border-orange-500 bg-white px-5 text-sm font-semibold text-orange-600 hover:bg-orange-50 transition-colors disabled:opacity-50">
                Apply
              </button>
            </div>
            {couponApplied && <p className="text-xs text-emerald-600 font-medium -mt-3">Coupon applied! ₹500 off</p>}

            {/* Confirm */}
            <button type="button" disabled={!termsAgreed} onClick={handleConfirmBook}
              className="w-full h-[52px] flex items-center justify-center gap-2.5 rounded-xl bg-orange-500 text-base font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Confirm &amp; Book Now
            </button>
            {!termsAgreed && (
              <p className="text-xs text-gray-400 text-center -mt-3">
                Please agree to the Terms &amp; Conditions to proceed
              </p>
            )}

            <div className="flex items-center justify-center gap-1.5">
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-xs text-gray-400">Secure payment powered by Razorpay</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <LoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={() => setLoginModalOpen(false)}
      />
    </main>
  );
}
