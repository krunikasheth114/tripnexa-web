'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '',
);

// Shared Stripe element style — matches our input aesthetic
const STRIPE_STYLE = {
  base: {
    color: '#111827',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: '500',
    '::placeholder': { color: '#9ca3af' },
  },
  invalid: { color: '#ef4444' },
};

// Wrapper that mimics our input box
function CardField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 flex items-center focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}

// ── Inner form (needs to be inside <Elements>) ──────────────────
function CheckoutForm({
  bookingNumber,
  totalAmount,
  clientSecret,
  onClose,
}: {
  bookingNumber: string;
  totalAmount: number;
  clientSecret: string;
  onClose: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError('');

    const cardNumber = elements.getElement(CardNumberElement);
    if (!cardNumber) { setLoading(false); return; }

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardNumber,
          billing_details: { name: cardholderName.trim() || undefined },
        },
      }
    );

    if (stripeError) {
      setError(stripeError.message ?? 'Payment failed. Please try again.');
      setLoading(false);
    } else if (paymentIntent?.status === 'succeeded') {
      window.location.href = `${window.location.origin}/booking/success?ref=${bookingNumber}`;
    }
  }

  return (
    <form onSubmit={handlePay} className="flex flex-col h-full">
      {/* Scrollable payment fields */}
      <div className="flex-1 space-y-4 overflow-y-auto">

        {/* Cardholder name */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder="As on card"
            className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
          />
        </div>

        {/* Card number */}
        <CardField label="Card Number">
          <CardNumberElement options={{ style: STRIPE_STYLE, showIcon: true }} />
        </CardField>

        {/* Expiry + CVC */}
        <div className="grid grid-cols-2 gap-4">
          <CardField label="Expiry Date">
            <CardExpiryElement options={{ style: STRIPE_STYLE }} />
          </CardField>
          <CardField label="Security Code (CVC)">
            <CardCvcElement options={{ style: STRIPE_STYLE }} />
          </CardField>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}
      </div>

      {/* Fixed bottom buttons */}
      <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 h-11 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!stripe || loading}
            className="flex-1 h-11 rounded-xl bg-orange-500 text-sm font-semibold text-white hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Processing…
              </span>
            ) : (
              `Pay ₹${totalAmount.toLocaleString('en-IN')}`
            )}
          </button>
        </div>

        {/* Trust badge */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Secured by Stripe · 256-bit SSL encryption
        </div>
      </div>
    </form>
  );
}

// ── Modal wrapper ────────────────────────────────────────────────
interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  clientSecret: string;
  bookingNumber: string;
  totalAmount: number;
  packageTitle: string;
}

export function PaymentModal({
  open,
  onClose,
  clientSecret,
  bookingNumber,
  totalAmount,
  packageTitle,
}: PaymentModalProps) {
  if (!open || !clientSecret || clientSecret.trim() === '') return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden h-[40rem] flex flex-col">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-orange-500 to-amber-400 px-8 py-4">
          <button
            onClick={onClose}
            className="absolute right-4 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-center justify-between pr-8">
            <div>
              <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-0.5">
                Complete Payment
              </p>
              <h2 className="text-lg font-bold text-white leading-tight">{packageTitle}</h2>
            </div>
            <p className="text-white font-bold text-2xl">
              ₹{totalAmount.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* Stripe Elements */}
        <div className="px-8 py-5 flex-1 overflow-hidden flex flex-col">
          <Elements
            stripe={stripePromise}
            options={{ clientSecret }}
          >
            <CheckoutForm
              bookingNumber={bookingNumber}
              totalAmount={totalAmount}
              clientSecret={clientSecret}
              onClose={onClose}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
}
