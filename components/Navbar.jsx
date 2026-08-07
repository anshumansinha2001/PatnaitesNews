"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import useHideOnScroll from "@/hooks/useHideOnScroll";

// Shared top masthead. Auto-hides on scroll down and reappears on scroll up.
// `right` lets a page swap the default Contact button (e.g. the article page's
// Report button).
const Navbar = ({ right }) => {
  const hidden = useHideOnScroll();
  const [isAdmin, setIsAdmin] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // The admin login stores a 666-char token under "cache" (see admin-login).
    try {
      const token = JSON.parse(localStorage.getItem("cache"));
      setIsAdmin(typeof token === "string" && token.length === 666);
    } catch {
      setIsAdmin(false);
    }
  }, []);

  // Close the mobile menu whenever the navbar auto-hides.
  useEffect(() => {
    if (hidden) setOpen(false);
  }, [hidden]);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md transition-transform duration-300 will-change-transform ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-5 md:px-8">
        {/* Wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-1.5"
          aria-label="Patnaites Media — Home"
          onClick={() => setOpen(false)}
        >
          <span className="font-serif text-xl font-bold tracking-tight text-ink md:text-2xl">
            Patnaites <span className="text-accent">Media</span>
          </span>
          <Image
            src={assets.blue_tick}
            className="w-5 md:w-[22px]"
            alt="Verified"
            width={22}
            height={22}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 text-sm font-medium text-ink md:flex">
          <Link href="/about" className="transition-colors hover:text-accent">
            About
          </Link>
          {isAdmin && (
            <Link href="/admin" className="transition-colors hover:text-accent">
              Admin
            </Link>
          )}
          {right ? (
            right
          ) : (
            <Link
              href="/contact"
              className="rounded-full bg-ink px-5 py-2 text-white transition-colors hover:bg-accent"
            >
              Contact
            </Link>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink transition-colors hover:bg-gray-100 md:hidden"
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-gray-200 bg-white transition-[max-height] duration-300 ease-out md:hidden ${
          open ? "max-h-72" : "max-h-0 border-t-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-5 py-3 text-sm font-medium text-ink">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-100 hover:text-accent"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-100 hover:text-accent"
          >
            About
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-100 hover:text-accent"
            >
              Admin
            </Link>
          )}
          {right ? (
            <div onClick={() => setOpen(false)} className="px-3 py-2">
              {right}
            </div>
          ) : (
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-full bg-ink px-4 py-2.5 text-center text-white transition-colors hover:bg-accent"
            >
              Contact
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
