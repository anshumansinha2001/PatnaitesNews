"use client";
import axios from "axios";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [email, setEmail] = React.useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email);

      const response = await axios.post("/api/email", formData);

      if (response.data.success) {
        toast.success("Subscribed successfully");
        setEmail("");
      } else {
        toast.error(response.data.message);
        setEmail("");
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong!";
      toast.error(errMsg);
      console.error(
        "Error subscribing to newsletter:",
        error.response?.data?.message
      );
      console.log(error);
    }
  };

  return (
    <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
      <ToastContainer theme="colored" position="top-right" />
      <div className="mx-auto max-w-content px-5 py-14 text-center md:px-8 md:py-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
          </span>
          Serving Patna since 2016
        </span>

        <h1 className="mx-auto mt-6 max-w-3xl font-serif text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl md:text-6xl">
          The Latest News from{" "}
          <span className="text-accent">Patna &amp; Bihar</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg">
          Stay informed with the most up-to-date and reliable reporting on local
          and global events — clear, fast, and trustworthy.
        </p>

        {/* Newsletter */}
        <form
          onSubmit={onSubmitHandler}
          className="mx-auto mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            name="email"
            id="email"
            required
            placeholder="Enter your email"
            className="w-full flex-1 rounded-full border border-gray-300 bg-white px-5 py-3 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-accent"
          />
          <button
            type="submit"
            className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-dark"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-3 text-xs text-gray-400">
          Join our readers. No spam, unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default Header;
