"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FiHome,
  FiList,
  FiPlus,
  FiImage,
  FiMail,
  FiFlag,
  FiUsers,
  FiExternalLink,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

const navItems = [
  { href: "/admin", label: "Dashboard", Icon: FiHome, exact: true },
  { href: "/admin/news-list", label: "News List", Icon: FiList },
  { href: "/admin/create-news", label: "Add News", Icon: FiPlus },
  { href: "/admin/ads", label: "Promotions", Icon: FiImage },
  { href: "/admin/contacts", label: "Contacts", Icon: FiMail },
  { href: "/admin/reports", label: "Reports", Icon: FiFlag },
  { href: "/admin/subscribers", label: "Subscribers", Icon: FiUsers },
];

const Topbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function handleLogout() {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.clear();
      window.location.href = "/admin-login";
    }
  }

  const isActive = (item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <div className="w-full bg-ink text-white">
      <nav className="flex items-center justify-between px-5 py-4">
        <Link href="/admin" className="font-serif text-lg font-bold">
          Patnaites <span className="text-accent">Media</span>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="text-white focus:outline-none"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="space-y-1 border-t border-white/10 px-3 py-3">
          {navItems.map(({ href, label, Icon }) => (
            <Link
              key={href}
              onClick={() => setOpen(false)}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive({ href, exact: href === "/admin" })
                  ? "bg-accent text-white"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
          <Link
            href="/"
            target="_blank"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white"
          >
            <FiExternalLink size={18} />
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-accent hover:text-white"
          >
            <FiLogOut size={18} />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Topbar;
