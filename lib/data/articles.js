import connectDB from "@/lib/config/db";
import ArticleModel from "@/lib/models/articleModel";

// Convert Mongo documents (ObjectId/Date) to plain JSON-safe objects so they
// can be passed from Server Components to Client Components.
const serialize = (value) => JSON.parse(JSON.stringify(value));

// Aggregation projection that returns everything a card needs WITHOUT shipping
// the full HTML article body. `excerpt` is the first slice of the body (tags
// stripped on the client) and `readingMinutes` is estimated from body length.
const LITE_PROJECTION = {
  $project: {
    title: 1,
    slug: 1,
    image: 1,
    category: 1,
    author: 1,
    updatedAt: 1,
    createdAt: 1,
    excerpt: { $substrCP: [{ $ifNull: ["$description", ""] }, 0, 240] },
    readingMinutes: {
      $max: [
        1,
        {
          $ceil: {
            $divide: [{ $strLenCP: { $ifNull: ["$description", ""] } }, 1100],
          },
        },
      ],
    },
  },
};

// All articles, newest first, in the lightweight shape (used by the home feed).
export async function getArticlesLite() {
  await connectDB();
  const docs = await ArticleModel.aggregate([
    { $sort: { createdAt: -1 } },
    LITE_PROJECTION,
  ]);
  return serialize(docs);
}

// A single full article by slug (used by the article page).
export async function getArticleBySlug(slug) {
  if (!slug) return null;
  await connectDB();
  const doc = await ArticleModel.findOne({ slug: slug.toLowerCase() }).lean();
  return doc ? serialize(doc) : null;
}

// Up to `limit` related stories — same category first, then newest others.
export async function getRelatedArticles(category, currentSlug, limit = 3) {
  await connectDB();
  const docs = await ArticleModel.aggregate([
    { $match: { slug: { $ne: (currentSlug || "").toLowerCase() } } },
    // Same-category stories rank first (0), everything else after (1).
    {
      $addFields: {
        _rank: { $cond: [{ $eq: ["$category", category] }, 0, 1] },
      },
    },
    { $sort: { _rank: 1, createdAt: -1 } },
    { $limit: limit },
    LITE_PROJECTION,
  ]);
  return serialize(docs);
}
