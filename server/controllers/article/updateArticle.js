const Article = require("../../models/article");

module.exports.updateArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await Article.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (result) {
      res.status(200).json({ message: "Article has been updated!", result });
    } else {
      res.status(404).json({ message: "Article has not found!" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error updating item", error });
    console.error(error);
  }
};
