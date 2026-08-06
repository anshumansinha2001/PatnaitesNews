import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaRegCircleUser,
} from "react-icons/fa6";

const socials = [
  {
    href: "https://www.facebook.com/patnaite",
    label: "Facebook",
    Icon: FaFacebookF,
  },
  {
    href: "https://www.instagram.com/patnaite",
    label: "Instagram",
    Icon: FaInstagram,
  },
  {
    href: "https://www.youtube.com/@Patnaites_Official",
    label: "YouTube",
    Icon: FaYoutube,
  },
  { href: "https://x.com/Patnaites2", label: "X (Twitter)", Icon: FaXTwitter },
  {
    href: "https://patnaites.vercel.app",
    label: "Portal",
    Icon: FaRegCircleUser,
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-content px-5 py-12 md:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="Patnaites Media — Home">
              <Image
                className="h-14 w-14 rounded-full object-cover md:h-16 md:w-16"
                src={assets.brand_icon}
                alt="Patnaites Media logo"
                width={64}
                height={64}
              />
            </Link>
            <div>
              <p className="font-serif text-lg font-bold">
                Patnaites<span className="text-accent">Media</span>
              </p>
              <p className="text-sm text-gray-400">
                Serving trusted content since 2016
              </p>
            </div>
          </div>

          {/* Nav + socials */}
          <div className="flex flex-col items-start gap-5 md:items-end">
            <nav className="flex items-center gap-6 text-sm font-medium text-gray-300">
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <Link
                href="/contact"
                className="transition-colors hover:text-white"
              >
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              {socials.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent"
                >
                  <Icon />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-gray-400 sm:flex-row">
          <p>&copy; {year} Patnaites Media. All rights reserved.</p>
          <p>
            Made with <span className="text-accent">❤️</span> by{" "}
            <Link
              href="https://growthhasten.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white underline underline-offset-4 transition-colors hover:text-accent"
            >
              GrowthHasten
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
