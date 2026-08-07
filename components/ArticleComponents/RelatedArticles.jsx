import NewsCard from "@/components/NewsCard";
import { getRelatedArticles } from "@/lib/data/articles";

// Shows up to 3 more stories from the same category (falls back to latest).
const RelatedArticles = async ({ category, currentSlug }) => {
  let related = [];
  try {
    related = await getRelatedArticles(category, currentSlug, 3);
  } catch (error) {
    console.error("Error fetching related articles:", error);
    return null;
  }

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
