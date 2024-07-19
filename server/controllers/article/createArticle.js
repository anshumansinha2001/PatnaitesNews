import Article from "../../models/article.js";

export const createArticle = async (req, res) => {
  const { title, isBreakingNews, content, author, category } = req.body;
  const img = req.file ? `uploads/articles/${req.file.filename}` : null;

  try {
    const articleExists = await Article.findOne({ title });
    if (articleExists) {
      return res.status(409).json({ message: "This article already exists!" });
    }

    const newArticle = new Article({
      img,
      title,
      isBreakingNews,
      content,
      author,
      category,
    });

    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};
