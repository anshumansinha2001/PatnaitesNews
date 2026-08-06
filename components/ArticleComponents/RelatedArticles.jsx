import axios from "axios";
import NewsCard from "@/components/NewsCard";

// Shows up to 3 more stories from the same category (falls back to latest).
const RelatedArticles = async ({ category, currentSlug }) => {
  let articles = [];

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/article`
    );
    articles = response.data.articles || [];
  } catch (error) {
    console.log("Error fetching related articles:", error);
    return null;
  }

  const pool = articles.filter((a) => a.slug !== currentSlug);
  const sameCategory = pool.filter((a) => a.category === category);
  const related = (sameCategory.length ? sameCategory : pool).slice(0, 3);

  if (!related.length) return null;

  return (
    <section
      aria-labelledby="related-heading"
      className="mx-auto mt-16 max-w-content px-5 md:px-8"
    >
      <div className="mb-8 flex items-center justify-between border-t border-gray-200 pt-10">
        <h2
          id="related-heading"
          className="font-serif text-2xl font-bold tracking-tight text-ink sm:text-3xl"
        >
          More stories
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((article) => (
          <NewsCard key={article._id} {...article} />
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
