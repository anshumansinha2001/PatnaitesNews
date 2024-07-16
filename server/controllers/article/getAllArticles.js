const Article = require("../../models/article");

const getAllArticles = async (req, res) => {
  try {
    // Fetch all articles sorted by creation date
    const articles = await Article.find().sort({ createdAt: -1 });

    // Adjust articles to include full image URLs
    const formattedArticles = articles.map((article) => ({
      ...article.toObject(),
      img: article.img
        ? `${req.protocol}://${req.headers.host}/${article.img}`
        : null,
    }));

    res.status(200).json(formattedArticles);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve articles" });
    console.error(error.message);
  }
};

module.exports = { getAllArticles };
