"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  FiFileText,
  FiUsers,
  FiMail,
  FiFlag,
  FiPlus,
  FiImage,
  FiArrowRight,
} from "react-icons/fi";

export default function Admin() {
  const [stats, setStats] = useState({
    articles: null,
    subscribers: null,
    contacts: null,
    reports: null,
  });

  useEffect(() => {
    const load = async () => {
      const safe = async (url, key) => {
        try {
          const { data } = await axios.get(url);
          return (data.articles || data.emails || data.contacts || data.reports || [])
            .length;
        } catch {
          return null;
        }
      };
      const [articles, subscribers, contacts, reports] = await Promise.all([
        safe("/api/article"),
        safe("/api/email"),
        safe("/api/contact"),
        safe("/api/report"),
      ]);
      setStats({ articles, subscribers, contacts, reports });
    };
    load();
  }, []);

  const cards = [
    { key: "articles", label: "Articles", Icon: FiFileText, href: "/admin/news-list" },
    { key: "subscribers", label: "Subscribers", Icon: FiUsers, href: "/admin/subscribers" },
    { key: "contacts", label: "Contacts", Icon: FiMail, href: "/admin/contacts" },
    { key: "reports", label: "Reports", Icon: FiFlag, href: "/admin/reports" },
  ];

  const actions = [
    { label: "Add News", desc: "Publish a new article", Icon: FiPlus, href: "/admin/create-news" },
    { label: "Manage Promotions", desc: "Between & bottom ads", Icon: FiImage, href: "/admin/ads" },
    { label: "News List", desc: "Edit or delete stories", Icon: FiFileText, href: "/admin/news-list" },
  ];

  return (
    <div className="px-5 py-8 md:px-10 md:py-10">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-ink md:text-4xl">
          Welcome back, Maalanch 👋
        </h1>
        <p className="mt-2 text-muted">
          Here&apos;s what&apos;s happening across Patnaites Media today.
        </p>
      </div>

      {/* Stat cards */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map(({ key, label, Icon, href }) => (
          <Link
            key={key}
            href={href}
            className="group rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Icon size={20} />
              </span>
              <FiArrowRight className="text-gray-300 transition-colors group-hover:text-accent" />
            </div>
            <p className="mt-4 text-3xl font-bold text-ink">
              {stats[key] === null ? "—" : stats[key]}
            </p>
            <p className="mt-1 text-sm text-muted">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <h2 className="mt-10 text-lg font-semibold text-ink">Quick actions</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map(({ label, desc, Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-colors hover:border-accent"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-ink text-white transition-colors group-hover:bg-accent">
              <Icon size={20} />
            </span>
            <div>
              <p className="font-semibold text-ink">{label}</p>
              <p className="text-sm text-muted">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
