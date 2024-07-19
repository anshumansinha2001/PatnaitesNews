import express from "express";
import uploadImg from "../middlewares/multer/multer.js";
import convertArticleToWebp from "../middlewares/sharp/articleSharp.js";

import {
  createArticle,
  deleteArticle,
  deleteArticleImg,
  getAllArticles,
  updateArticle,
} from "../controllers/article/index.js";

const router = express.Router();

router.get("/article", getAllArticles);
router.post("/article", uploadImg, convertArticleToWebp, createArticle);
router.put("/article/:id", uploadImg, convertArticleToWebp, updateArticle);
router.delete("/article/:id", deleteArticle);
router.delete("/article-img/:id", deleteArticleImg);

export default router;
