import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

// Shared top masthead used across the site.
// `right` lets a page swap the default Contact button (e.g. the article page's Report button).
const Navbar = ({ right }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-5 md:px-8">
        {/* Wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-1.5"
          aria-label="Patnaites Media — Home"
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

        {/* Nav */}
        <nav className="flex items-center gap-5 text-sm font-medium text-ink md:gap-7">
          <Link
            href="/"
            className="hidden transition-colors hover:text-accent sm:inline"
          >
            Home
          </Link>
          {right ? (
            right
          ) : (
            <Link
              href="/contact"
              className="rounded-full bg-ink px-4 py-2 text-white transition-colors hover:bg-accent md:px-5"
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
