"use client";

import LoadingAdmin from "@/components/AdminComponents/LoadingAdmin";
import NewsTableItem from "@/components/AdminComponents/NewsTableItem";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { toast } from "react-toastify";

const Page = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const response = await axios.get("/api/article");

      setLoading(false);
      setArticles(response.data.articles);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching news:", error); // Handle error
    }
  };

  // Filter articles based on selected category
  const filteredArticles = useMemo(
    () =>
      category === "All"
        ? articles
        : articles.filter((article) => article.category === category),
    [category, articles]
  );

  // Delete article
  const deleteArticle = async (articleId) => {
    // Confirmation prompt
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );

    if (!userConfirmed) {
      return; // Exit if the user cancels the deletion
    }

    try {
      await axios.delete(`/api/article`, {
        params: { id: articleId },
      });
      toast.info("Article deleted successfully!");
      fetchNews();
    } catch (error) {
      toast.error("Failed to delete article.");
      console.error("Error deleting article:", error.message);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return <LoadingAdmin />;
  }

  return (
    <div className="px-5 py-8 md:px-10 md:py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink md:text-3xl">
            All News
          </h1>
          <p className="mt-1 text-sm text-muted">
            {articles.length} article{articles.length === 1 ? "" : "s"} published
          </p>
        </div>

        {/* Filter Option */}
        <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2">
          <FaFilter className="h-3.5 w-3.5 text-muted" />
          <select
            className="bg-transparent text-sm outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All</option>
            {Array.from(
              new Set(articles.map((article) => article.category))
            ).map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative mt-6 max-h-[78vh] overflow-auto rounded-2xl border border-gray-200 bg-white shadow-sm scrollbar-hide">
        <table className="w-full text-sm text-gray-600">
          <thead className="sticky top-0 z-20 bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr className="text-center">
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">Delete</th>
            </tr>
          </thead>

          <tbody>
            {filteredArticles.map((article) => (
              <NewsTableItem
                key={article._id}
                {...article}
                deleteArticle={deleteArticle}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
