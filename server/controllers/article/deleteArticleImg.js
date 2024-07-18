const Article = require("../../models/article");

module.exports.deleteAtricleImg = async (req, res) => {
  const id = req.params.id;
  try {
    // Find the article by id and update the img field to an empty string or null
    const result = await Article.findByIdAndUpdate(id, { img: null });

    if (result) {
      res.status(200).json({ message: "Article image deleted successfully." });
    } else {
      res
        .status(404)
        .json({ message: "Article with the specified ID not found." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete article image.",
      error: error.message,
    });
    console.error("Delete article image error:", error);
  }
};
