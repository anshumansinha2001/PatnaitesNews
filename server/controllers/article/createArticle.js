import Article from "../../models/article.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

export const createArticle = async (req, res) => {
  const { title, isBreakingNews, content, author, category } = req.body;

  const articleImgLocalPath = req.file?.path;
  const img = await uploadOnCloudinary(articleImgLocalPath);

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
