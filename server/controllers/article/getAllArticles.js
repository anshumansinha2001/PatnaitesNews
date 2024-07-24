import Article from "../../models/article.js";

export const getAllArticles = async (req, res) => {
  try {
    // Fetch all articles sorted by creation date
    const articles = await Article.find().sort({ createdAt: -1 });

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve articles" });
    console.error(error.message);
  }
};
