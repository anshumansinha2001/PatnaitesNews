const Article = require("../../models/article");

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });

    let filteredArticles = articles;
    if (req.query.search) {
      filteredArticles = articles.filter(
        (article) =>
          article.content.includes(req.query.search) ||
          article.category.includes(req.query.search)
      );
    }

    res.status(200).json(filteredArticles);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve articles" });
    console.error(error.message);
  }
};

module.exports = { getAllArticles };
