"use client";
import { assets } from "@/assets/assets";
import RTE from "@/components/AdminComponents/RTE";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import LoadingAdmin from "./LoadingAdmin";

const PostPage = ({ post }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [image, setImage] = useState(null);
  const title = watch("title");

  // Set default form values when articles data is loaded
  useEffect(() => {
    window.scrollTo(0, 0);

    if (post) {
      setValue("title", post?.title || "");
      setValue("slug", post?.slug || "");
      setValue("category", post?.category);
      setValue("author", post?.author || "Patnaites Media");
      setValue("description", post?.description || "");
      setImage(post?.image || null);
    }
  }, [post, setValue]);

  const generateSlug = useCallback((title) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .substring(0, 50); // Limit length to 50 characters

    return slug.endsWith("-") ? slug.slice(0, -1) : slug; // Remove trailing hyphen
  }, []);

  useEffect(() => {
    if (title) {
      setValue("slug", generateSlug(title));
    }
  }, [title, generateSlug, setValue]);

  const onSubmit = async (data) => {
    if (!image || !data.description) {
      toast.error("Please add an image and description!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("slug", data.slug);
    formData.append("author", data.author);

    try {
      setLoading(true);
      let response;
      if (post) {
        response = await axios.put(`/api/article?id=${post._id}`, formData);
        setLoading(false);
        toast.success(response.data.message || "Article updated successfully");
      } else {
        response = await axios.post(`/api/article`, formData);
        setLoading(false);
        toast.success(response.data.message || "Article created successfully");
      }

      router.push("/admin/news-list");
      // Reset the form and clear image state
      reset();
      setImage(null);
    } catch (error) {
      let errorMessage = "Something went wrong";
      setLoading(false);
      // Check if there's a response from the server
      if (error.response) {
        if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status >= 500) {
          errorMessage = "Server error, please try again later";
        } else {
          errorMessage =
            "Failed to submit the article, check your data and try again";
        }
      } else if (error.request) {
        errorMessage =
          "No response from server. Please check your network connection.";
      } else {
        errorMessage = error.message;
      }
      console.error("Error submitting article:", error);
      toast.error(errorMessage);
    }
  };

  // Delete article
  const deletePost = async (articleId) => {
    if (!window.confirm("Are you sure you want to delete this article?"))
      return;

    try {
      setLoading(true);
      await axios.delete(`/api/article`, {
        params: { id: articleId },
      });

      setLoading(false);
      toast.info("Article deleted successfully!");
      router.push("/admin/news-list");

      // Get Report Id from session storage and delete it
      const reportId = sessionStorage.getItem("reportId");
      if (reportId) {
        await axios.delete(`/api/report?id=${reportId}`);
        sessionStorage.removeItem("reportId");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to delete article.");
      console.error("Error deleting article:", error.message);
    }
  };

  const imagePreview = useMemo(() => {
    return image
      ? typeof image === "string"
        ? image
        : URL.createObjectURL(image)
      : assets.upload_area;
  }, [image]);

  if (loading) {
    return <LoadingAdmin />;
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent";
  const labelClass = "mb-1.5 block text-sm font-semibold text-ink";

  return (
    <div className="px-5 py-8 md:px-10 md:py-10">
      <h1 className="font-serif text-2xl font-bold text-ink md:text-3xl">
        {post ? "Edit Article" : "Add News"}
      </h1>
      <p className="mt-1 text-sm text-muted">
        {post
          ? "Update the details of this story."
          : "Fill in the details to publish a new story."}
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 max-w-3xl space-y-6 rounded-2xl border border-gray-200 bg-white p-6 md:p-8"
      >
        {/* Thumbnail */}
        <div>
          <p className={labelClass}>Thumbnail</p>
          <label htmlFor="image" className="block w-fit cursor-pointer">
            <Image
              className="h-[200px] w-full rounded-xl border border-gray-200 object-cover md:w-[400px]"
              src={imagePreview}
              alt="upload area"
              width={400}
              height={200}
            />
            <span className="mt-2 block text-xs text-muted">
              Click the image to {image ? "change" : "upload"}
            </span>
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            accept="image/*"
            hidden
          />
        </div>

        {/* Title */}
        <div>
          <label className={labelClass}>News Title</label>
          <input
            {...register("title", { required: true })}
            className={inputClass}
            type="text"
            placeholder="Title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-accent">Title is required</p>
          )}
        </div>

        {/* Slug */}
        <div>
          <label className={labelClass}>
            Slug{" "}
            <span className="font-normal text-muted">
              (try to write a custom slug)
            </span>
          </label>
          <input
            {...register("slug", { required: true })}
            className={inputClass}
            type="text"
            placeholder="e.g: my-first-article"
          />
          {errors.slug && (
            <p className="mt-1 text-sm text-accent">Slug is required</p>
          )}
        </div>

        {/* Category + Author */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Category</label>
            <select
              {...register("category", { required: true })}
              id="category"
              className={inputClass}
            >
              <option>Trending</option>
              <option>International</option>
              <option>City</option>
              <option>Business</option>
              <option>Politics</option>
              <option>Education</option>
              <option>Technology</option>
              <option>Religion</option>
              <option>Crime</option>
              <option>Entertainment</option>
              <option>Lifestyle</option>
              <option>Sports</option>
              <option>Culture</option>
              <option>Finance</option>
              <option>Travel</option>
              <option>Career</option>
              <option>Health</option>
              <option>Weather</option>
              <option>Food</option>
              <option>Fashion</option>
              <option>Innovation</option>
              <option>Environment</option>
              <option>Science</option>
              <option>Economy</option>
              <option>Media</option>
              <option>Opinion</option>
              <option>Military-Defense</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Author / Source</label>
            <input
              {...register("author", { required: true })}
              className={inputClass}
              type="text"
              placeholder="Author"
              defaultValue="Patnaites Media"
            />
            {errors.author && (
              <p className="mt-1 text-sm text-accent">Author is required</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className={labelClass}>Description</label>
          <RTE defaultValue={post?.description} control={control} />
        </div>

        {/* Submit */}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <button
            className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
            type="submit"
          >
            {post ? "Update Article" : "Publish Article"}
          </button>

          {post && (
            <button
              className="rounded-lg border border-gray-200 px-6 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
              type="button"
              onClick={() => deletePost(post._id)}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostPage;
