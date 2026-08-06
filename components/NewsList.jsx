"use client";
import NewsCard from "./NewsCard";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FiSearch, FiX } from "react-icons/fi";

const PER_PAGE = 22;

const stripHtml = (html = "") => html.replace(/(<([^>]+)>)/gi, " ");

const NewsList = () => {
  const [menu, setMenu] = useState("All");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [aticles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const response = await axios.get("/api/article");
      setArticles(response.data.articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
    // Support the WebSite SearchAction / sitelinks searchbox: /?q=term
    if (typeof window !== "undefined") {
      const q = new URLSearchParams(window.location.search).get("q");
      if (q) setQuery(q);
    }
  }, []);

  // Extract unique categories from article data
  const categories = useMemo(
    () => ["All", ...new Set(aticles.map((article) => article.category))],
    [aticles],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return aticles.filter((article) => {
      const inCategory = menu === "All" ? true : article.category === menu;
      if (!inCategory) return false;
      if (!q) return true;
      const haystack = `${article.title} ${article.category} ${stripHtml(
        article.description,
      )}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [aticles, menu, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  // Spotlight the newest story on the first page of the default "All" view
  // (not while actively searching).
  const showFeatured =
    menu === "All" &&
    currentPage === 1 &&
    !query.trim() &&
    pageItems.length > 0;
  const featured = showFeatured ? pageItems[0] : null;
  const gridItems = showFeatured ? pageItems.slice(1) : pageItems;

  const goToPage = (newPage) => {
    setPage(newPage);
    const anchor = document.getElementById("news-top");
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleMenuChange = (newMenu) => {
    setMenu(newMenu);
    setPage(1);
  };

  const handleSearch = (value) => {
    setQuery(value);
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-content px-5 md:px-8">
      {/* Search + category filter */}
      <div
        id="news-top"
        className="sticky top-16 z-40 -mx-5 scroll-mt-16 border-b border-gray-200 bg-white/90 px-5 py-3 backdrop-blur-md md:-mx-8 md:px-8"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="scrollbar-hide flex items-center gap-1 overflow-x-auto">
            {categories.map((category) => {
              const active = menu === category;
              return (
                <button
                  key={category}
                  onClick={() => handleMenuChange(category)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-ink text-white"
                      : "text-muted hover:bg-gray-100 hover:text-ink"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="relative w-full shrink-0 md:w-64">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search news…"
              aria-label="Search news"
              className="w-full rounded-full border border-gray-300 bg-white py-2 pl-9 pr-9 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-accent"
            />
            {query && (
              <button
                onClick={() => handleSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
              >
                <FiX />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[300px] py-10">
        {loading ? (
          <SkeletonGrid />
        ) : filtered.length === 0 ? (
          <EmptyState menu={menu} query={query} />
        ) : (
          <>
            {query.trim() && (
              <p className="mb-8 text-sm text-muted">
                Showing{" "}
                <span className="font-semibold text-ink">
                  {filtered.length}
                </span>{" "}
                result{filtered.length === 1 ? "" : "s"} for{" "}
                <span className="font-semibold text-ink">“{query}”</span>
              </p>
            )}

            {featured && (
              <div className="mb-12 border-b border-gray-200 pb-12">
                <NewsCard {...featured} featured />
              </div>
            )}

            <div className="grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {gridItems.map((article) => (
                <NewsCard key={article._id} {...article} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onChange={goToPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

/* ---------- Sub-components ---------- */

const SkeletonGrid = () => (
  <div className="grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="flex flex-col">
        <div className="skeleton aspect-[16/10] w-full rounded-xl" />
        <div className="skeleton mt-4 h-3 w-24 rounded" />
        <div className="skeleton mt-3 h-4 w-full rounded" />
        <div className="skeleton mt-2 h-4 w-3/4 rounded" />
      </div>
    ))}
  </div>
);

const EmptyState = ({ menu, query }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
      {query ? "🔍" : "📰"}
    </div>
    <p className="text-lg font-semibold text-ink">No stories found</p>
    <p className="max-w-sm text-sm text-muted">
      {query ? (
        <>
          We couldn&apos;t find anything matching{" "}
          <span className="font-medium text-ink">“{query}”</span>. Try a
          different keyword.
        </>
      ) : (
        <>
          There are no articles in{" "}
          <span className="font-medium text-ink">{menu}</span> right now. Check
          back soon for fresh updates.
        </>
      )}
    </p>
  </div>
);

const Pagination = ({ currentPage, totalPages, onChange }) => {
  // Build a compact page list with ellipses.
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav
      className="mt-14 flex items-center justify-center gap-1.5"
      aria-label="Pagination"
    >
      <button
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-10 items-center gap-1 rounded-full border border-gray-200 px-4 text-sm font-medium text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200"
      >
        <span aria-hidden>←</span>
        <span className="hidden sm:inline">Prev</span>
      </button>

      {pages.map((p, idx) =>
        p === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="px-2 text-sm text-muted"
            aria-hidden
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-current={p === currentPage ? "page" : undefined}
            className={`h-10 w-10 rounded-full text-sm font-medium transition-colors ${
              p === currentPage
                ? "bg-accent text-white"
                : "text-ink hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-10 items-center gap-1 rounded-full border border-gray-200 px-4 text-sm font-medium text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200"
      >
        <span className="hidden sm:inline">Next</span>
        <span aria-hidden>→</span>
      </button>
    </nav>
  );
};

export default NewsList;
