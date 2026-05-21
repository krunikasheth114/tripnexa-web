'use client';

import { Suspense, useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getBookingByNumberApi, type BookingDetail } from '@/services/booking';

// ── Inner component — uses useSearchParams, must be inside Suspense ──
function BookingSuccessContent() {
  const params = useSearchParams();
  const bookingNumber = params.get('ref') ?? '';

  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [status, setStatus] = useState<'loading' | 'confirmed' | 'pending' | 'failed'>('loading');
  const pollCount = useRef(0);

  useEffect(() => {
    if (!bookingNumber) { setStatus('failed'); return; }
    fetchBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingNumber]);

  async function fetchBooking() {
    try {
      const data = await getBookingByNumberApi(bookingNumber);
      setBooking(data);

      if (data.bookingStatus === 'CONFIRMED') {
        setStatus('confirmed');
      } else if (data.bookingStatus === 'CANCELLED' || data.paymentStatus === 'FAILED') {
        setStatus('failed');
      } else if (pollCount.current < 6) {
        // Poll up to 6 times (12 seconds) waiting for webhook to confirm
        pollCount.current += 1;
        setTimeout(fetchBooking, 2000);
        setStatus('pending');
      } else {
        setStatus('pending');
      }
    } catch {
      setStatus('failed');
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      {status === 'loading' || status === 'pending' ? (
        <LoadingState bookingNumber={bookingNumber} isPending={status === 'pending'} />
      ) : status === 'confirmed' && booking ? (
        <ConfirmedState booking={booking} />
      ) : (
        <FailedState bookingNumber={bookingNumber} />
      )}
    </div>
  );
}

// ── Page export — wraps content in Suspense (required for useSearchParams) ──
export default function BookingSuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Suspense fallback={
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <div className="flex justify-center">
            <div className="h-24 w-24 rounded-full bg-orange-50 flex items-center justify-center">
              <svg className="animate-spin h-10 w-10 text-orange-500" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            </div>
          </div>
          <p className="mt-6 text-gray-500 text-sm">Loading your booking…</p>
        </div>
      }>
        <BookingSuccessContent />
      </Suspense>
      <Footer />
    </main>
  );
}

// ── Confirmed ────────────────────────────────────────────────────
function ConfirmedState({ booking }: { booking: BookingDetail }) {
  const travelDate = new Date(booking.travelDate).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="text-center space-y-8">
      {/* Success icon */}
      <div className="flex justify-center">
        <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="h-12 w-12 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <div>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-gray-900">
          Booking Confirmed! 🎉
        </h1>
        <p className="mt-2 text-gray-500 text-base">
          Your trip is booked. We&apos;ve sent the details to your email.
        </p>
      </div>

      {/* Booking card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-7 text-left space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-orange-500">
            Booking Confirmed
          </span>
          <span className="text-xs font-mono bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
            {booking.bookingNumber}
          </span>
        </div>

        <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-gray-900">
          {booking.package.title}
        </h2>

        {booking.package.destination && (
          <p className="text-sm text-gray-500">{booking.package.destination.name}, Gujarat</p>
        )}

        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
          <Detail label="Travel Date" value={travelDate} />
          <Detail label="Guests" value={`${booking.totalGuests} person${booking.totalGuests > 1 ? 's' : ''}`} />
          <Detail label="Duration" value={`${booking.package.days}D / ${booking.package.nights}N`} />
          <Detail label="Amount Paid" value={`₹${booking.paidAmount.toLocaleString('en-IN')}`} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="px-8 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/destinations"
          className="px-8 py-3 rounded-xl bg-orange-500 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
        >
          Explore More Trips
        </Link>
      </div>
    </div>
  );
}

// ── Loading / Pending ─────────────────────────────────────────────
function LoadingState({ bookingNumber, isPending }: { bookingNumber: string; isPending: boolean }) {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="h-24 w-24 rounded-full bg-orange-50 flex items-center justify-center">
          <svg className="animate-spin h-10 w-10 text-orange-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
      </div>
      <div>
        <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-gray-900">
          {isPending ? 'Confirming your booking…' : 'Processing payment…'}
        </h1>
        <p className="mt-2 text-gray-500 text-sm">
          {isPending
            ? 'Payment received. Waiting for confirmation.'
            : 'Please wait while we confirm your payment.'}
        </p>
        {bookingNumber && (
          <p className="mt-3 text-xs font-mono text-gray-400">Ref: {bookingNumber}</p>
        )}
      </div>
    </div>
  );
}

// ── Failed ───────────────────────────────────────────────────────
function FailedState({ bookingNumber }: { bookingNumber: string }) {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="h-24 w-24 rounded-full bg-red-50 flex items-center justify-center">
          <svg className="h-12 w-12 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <div>
        <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-gray-900">
          Payment Failed
        </h1>
        <p className="mt-2 text-gray-500 text-sm">
          Your payment could not be processed. No amount was charged.
        </p>
        {bookingNumber && (
          <p className="mt-2 text-xs font-mono text-gray-400">Ref: {bookingNumber}</p>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="px-8 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Back to Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="px-8 py-3 rounded-xl bg-orange-500 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-semibold text-gray-900 mt-0.5">{value}</p>
    </div>
  );
}
