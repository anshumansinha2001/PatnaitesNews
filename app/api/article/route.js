import connectDB from "@/lib/config/db";
import ArticleModel from "@/lib/models/articleModel";
import { NextResponse } from "next/server";
import {
  uploadImageToCloudinary,
  deleteCloudinaryImage,
  handleError,
} from "@/lib/cloudinaryUtils";
import { getArticlesLite, getArticleBySlug } from "@/lib/data/articles";

const CLOUDINARY_FOLDER = "patnaitesNews";

// GET: a single article by slug, or the lightweight list of all articles.
export async function GET(request) {
  const slug = request.nextUrl.searchParams.get("slug");
  try {
    if (slug) {
      const article = await getArticleBySlug(slug);
      return NextResponse.json({ success: true, article });
    }

    const articles = await getArticlesLite();
    return NextResponse.json(
      { success: true, articles },
      {
        headers: {
          // Cache the feed at the edge; serve stale while revalidating.
          "Cache-Control":
            "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching articles:", error);
    return handleError(error.message || "Failed to fetch articles");
  }
}

// POST: create a new article (image uploaded straight to Cloudinary).
export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();

    const image = formData.get("image");
    if (!image || !image.size) {
      return handleError("Image file is required", 400);
    }

    const imageUrl = await uploadImageToCloudinary(image, CLOUDINARY_FOLDER);

    await ArticleModel.create({
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      image: imageUrl,
      slug: formData.get("slug"),
      author: formData.get("author"),
    });

    return NextResponse.json({
      success: true,
      message: "New Article inserted successfully",
    });
  } catch (error) {
    console.error("Error inserting article:", error);
    return handleError(error.message || "Failed to insert article");
  }
}

// PUT: update an article, replacing the image only when a new one is sent.
export async function PUT(request) {
  const id = request.nextUrl.searchParams.get("id");

  try {
    await connectDB();
    const article = await ArticleModel.findById(id);
    if (!article) {
      return handleError("Article not found", 404);
    }

    const formData = await request.formData();

    const newImage = formData.get("image");
    let newImageUrl = article.image;

    if (newImage && newImage.size > 0) {
      await deleteCloudinaryImage(article.image, CLOUDINARY_FOLDER);
      newImageUrl = await uploadImageToCloudinary(newImage, CLOUDINARY_FOLDER);
    }

    const updatedNewsData = {
      title: formData.get("title") || article.title,
      description: formData.get("description") || article.description,
      category: formData.get("category") || article.category,
      image: newImageUrl,
      slug: formData.get("slug") || article.slug,
      author: formData.get("author") || article.author,
    };

    await ArticleModel.findByIdAndUpdate(id, updatedNewsData, { new: true });

    return NextResponse.json({
      success: true,
      message: "Article updated successfully",
      updatedArticle: updatedNewsData,
    });
  } catch (error) {
    console.error("Error updating article:", error);
    return handleError(error.message || "Failed to update article");
  }
}

// DELETE: remove an article and its Cloudinary image.
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  try {
    await connectDB();
    const article = await ArticleModel.findById(id);
    if (!article) {
      return handleError("Article not found", 404);
    }

    await deleteCloudinaryImage(article.image, CLOUDINARY_FOLDER);
    await ArticleModel.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Article and associated image deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting article:", error);
    return handleError(error.message || "Failed to delete article");
  }
}
