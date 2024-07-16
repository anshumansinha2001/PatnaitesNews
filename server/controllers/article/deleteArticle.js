const Article = require("../../models/article");

const deleteArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Article.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ message: "Article has been deleted!" });
    } else {
      res.status(404).json({ message: "Article has not found!" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error deleting item", error });
    console.error(error.message);
  }
};

module.exports = { deleteArticle };
