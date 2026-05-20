"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log("Contact request:", data);
    setIsSubmitted(true);
    reset();
  };

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500">
          Contact Us
        </p>
        <h2 className="mt-3 text-3xl font-bold text-gray-900">
          Share your support query
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
          For E-Tickets, cancellations, and refund status, use Manage My
          Bookings on our Customer Support page. For other assistance, submit
          your query here or call +91 98765 43210.
        </p>
      </div>

      {isSubmitted ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
          Thanks for contacting us. Our Customer Support Team has received your
          query. For urgent help, call +91 98765 43210.
        </div>
      ) : null}

      <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-700">
              Name
            </span>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              {...register("name", {
                required: "Please enter your name.",
                minLength: {
                  value: 2,
                  message: "Name should be at least 2 characters.",
                },
              })}
            />
            {errors.name ? (
              <span className="mt-2 block text-sm text-rose-500">
                {errors.name.message}
              </span>
            ) : null}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </span>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              {...register("email", {
                required: "Please enter your email address.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address.",
                },
              })}
            />
            {errors.email ? (
              <span className="mt-2 block text-sm text-rose-500">
                {errors.email.message}
              </span>
            ) : null}
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-gray-700">
            Message
          </span>
          <textarea
            rows={6}
            placeholder="Write your query with booking details or reference ID if available."
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
            {...register("message", {
              required: "Please add a short message.",
              minLength: {
                value: 10,
                message: "Message should be at least 10 characters.",
              },
            })}
          />
          {errors.message ? (
            <span className="mt-2 block text-sm text-rose-500">
              {errors.message.message}
            </span>
          ) : null}
        </label>

        <div className="flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-gray-500">
            24×7 Customer Support: +91 98765 43210
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
}
