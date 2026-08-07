"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiList, FiPlus, FiMail, FiFlag, FiUsers } from "react-icons/fi";
import { FiExternalLink, FiLogOut, FiImage } from "react-icons/fi";

const navItems = [
  { href: "/admin", label: "Dashboard", Icon: FiHome, exact: true },
  { href: "/admin/news-list", label: "News List", Icon: FiList },
  { href: "/admin/create-news", label: "Add News", Icon: FiPlus },
  { href: "/admin/ads", label: "Promotions", Icon: FiImage },
  { href: "/admin/contacts", label: "Contacts", Icon: FiMail },
  { href: "/admin/reports", label: "Reports", Icon: FiFlag },
  { href: "/admin/subscribers", label: "Subscribers", Icon: FiUsers },
];

function handleLogout() {
  if (window.confirm("Are you sure you want to log out?")) {
    localStorage.clear();
    window.location.href = "/admin-login";
  }
}

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col bg-ink text-white">
      {/* Brand */}
      <div className="border-b border-white/10 px-6 py-5">
        <Link href="/admin" className="block">
          <span className="font-serif text-xl font-bold tracking-tight">
            Patnaites <span className="text-accent">Media</span>
          </span>
          <p className="mt-0.5 text-xs uppercase tracking-wider text-gray-400">
            Admin Panel
          </p>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
        {navItems.map(({ href, label, Icon }) => {
          const active = isActive({ href, exact: href === "/admin" });
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-accent text-white"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer actions */}
      <div className="space-y-1 border-t border-white/10 px-3 py-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          <FiExternalLink size={18} />
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-accent hover:text-white"
        >
          <FiLogOut size={18} />
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
