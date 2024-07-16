const express = require("express");
const router = express.Router();

const { createArticle } = require("../controllers/article/createArticle");
const { getAllArticles } = require("../controllers/article/getAllArticles");
const { deleteArticle } = require("../controllers/article/deleteArticle");
const { updateArticle } = require("../controllers/article/updateArticle");

router.get("/article", getAllArticles);
router.post("/article", createArticle);
router.put("/article/:id", updateArticle);
router.delete("/article/:id", deleteArticle);

module.exports = router;
