"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiMail, FiCheckCircle } from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/contact", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        setSuccess(true);
      } else {
        toast.error(response.data.message || "Error submitting contact");
      }
    } catch (error) {
      console.error("Error submitting contact:", error);
      toast.error("Failed to submit contact");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-accent";

  return (
    <div className="flex min-h-screen flex-col">
      <ToastContainer theme="colored" position="top-right" />
      <Navbar />

      <main className="flex-1 bg-gray-50">
        <div className="mx-auto grid max-w-content gap-10 px-5 py-14 md:grid-cols-2 md:px-8 md:py-20">
          {/* Intro */}
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted">
              <FiMail /> Get in touch
            </span>
            <h1 className="mt-5 font-serif text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-4 max-w-md text-base text-muted">
              At Patnaites Media, we keep you updated! Reach out to us for brand
              promotions, advertisements, story tips, or general enquiries.
            </p>
            <p className="mt-6 text-sm text-muted">
              We&apos;ll get back to you as soon as possible.
            </p>
          </div>

          {/* Form / success */}
          <div className="flex items-center">
            {success ? (
              <div className="w-full rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <FiCheckCircle className="text-3xl" />
                </div>
                <h2 className="mt-5 text-xl font-bold text-ink">
                  Message sent!
                </h2>
                <p className="mt-2 text-sm text-muted">
                  We&apos;ve successfully received your message and our team is
                  already reviewing it. Expect a response shortly.
                </p>
                <Link
                  href="/"
                  className="mt-6 inline-flex rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent"
                >
                  Return to Home
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="mb-5">
                  <label
                    className="mb-2 block text-sm font-semibold text-ink"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder="Your Name"
                  />
                </div>
                <div className="mb-5">
                  <label
                    className="mb-2 block text-sm font-semibold text-ink"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="mb-2 block text-sm font-semibold text-ink"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder="Your Message"
                    rows="5"
                  ></textarea>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                  <Link
                    href="/"
                    className="text-sm font-medium text-muted transition-colors hover:text-ink"
                  >
                    Return to Home
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
