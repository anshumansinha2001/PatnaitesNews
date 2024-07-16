const { Schema, model } = require("mongoose");

// Create Schema for Articles
const articleSchema = new Schema(
  {
    img: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      trim: true, // This will remove any leading or trailing whitespace
      minlength: 5, // Minimum length for a title
    },

    isBreakingNews: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      required: true,
      minlength: 40, // minimum length for the content
    },
    author: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add a text index to the schema (for help in search functionality)
articleSchema.index({ title: "text", content: "text" });

// create model
const Article = model("Article", articleSchema);
module.exports = Article;
