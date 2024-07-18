const express = require("express");
const uploadImg = require("../middlewares/multer/multer");
const convertArticleToWebp = require("../middlewares/sharp/articleSharp");

const router = express.Router();

const { createArticle } = require("../controllers/article/createArticle");
const { getAllArticles } = require("../controllers/article/getAllArticles");
const { updateArticle } = require("../controllers/article/updateArticle");
const { deleteArticle } = require("../controllers/article/deleteArticle");
const { deleteAtricleImg } = require("../controllers/article/deleteArticleImg");

router.get("/article", getAllArticles);
router.post("/article", uploadImg, convertArticleToWebp, createArticle);
router.put("/article/:id", uploadImg, convertArticleToWebp, updateArticle);
router.delete("/article/:id", deleteArticle);
router.delete("/article-img/:id", deleteAtricleImg);

module.exports = router;
