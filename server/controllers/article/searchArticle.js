const Article = require("./path_to_your_article_model");

async function searchArticles(query) {
  try {
    const results = await Article.find(
      { $text: { $search: query } }, // Perform a text search
      { score: { $meta: "textScore" } } // Include the score in the results
    ).sort({ score: { $meta: "textScore" } }); // Sort by the text search score

    return results;
  } catch (error) {
    console.error("Error searching articles:", error);
    throw error;
  }
}

// Example usage:
searchArticles("तेज बारिश")
  .then((articles) => console.log("Found articles:", articles))
  .catch((error) => console.error("Search error:", error));
