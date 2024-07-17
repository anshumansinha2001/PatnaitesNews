const express = require("express");
const uploadImg = require("../middlewares/multer/multer");
const convertArticleToWebp = require("../middlewares/sharp/articleSharp");

const router = express.Router();

const { createArticle } = require("../controllers/article/createArticle");
const { getAllArticles } = require("../controllers/article/getAllArticles");
const { deleteArticle } = require("../controllers/article/deleteArticle");
const { updateArticle } = require("../controllers/article/updateArticle");

router.get("/article", getAllArticles);
router.post("/article", uploadImg, convertArticleToWebp, createArticle);
router.put("/article/:id", uploadImg, convertArticleToWebp, updateArticle);
router.delete("/article/:id", deleteArticle);

module.exports = router;
