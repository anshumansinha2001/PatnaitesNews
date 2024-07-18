import React, { useEffect, useState } from "react";
import RTE from "./RTE";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../Loading/Spinner";
import defaultArticleImg from "../../../assets/default_article_img.png";

const PostForm = ({ post }) => {
  const { register, handleSubmit, control, setValue } = useForm();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Set default form values when articles data is loaded
  useEffect(() => {
    window.scrollTo(0, 0);

    if (post) {
      setValue("title", post?.title || "");
      setValue("category", post?.category || "");
      setValue("author", post?.author);
      setValue("isBreakingNews", post?.isBreakingNews || false);
      setValue("content", post?.content || "");
    }
  }, [post, setValue]);

  const API_URL = import.meta.env.VITE_BACKEND_API_URL;

  // Form submission handler
  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      // Create a new FormData object to store form data
      const formData = new FormData();

      // Loop through each key in the 'data' object
      for (const key in data) {
        // Append the value associated with each key to the FormData object
        // 'key' is the name of the field, and 'data[key]' is the value
        formData.append(key, data[key]);
      }

      // Check if the 'image' key exists in the 'data' object and if it has any files (length > 0)
      if (data.image && data.image.length > 0) {
        // Append the first file in the 'image' array to the FormData object
        // The 'image' field name will be used to reference the file on the server
        formData.append("image", data.image[0]);
      }

      const response = post
        ? await axios.put(`${API_URL}/api/article/${post._id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        : await axios.post(`${API_URL}/api/article`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

      if (response) {
        if (post) {
          toast.info("Article Updated!");
        } else {
          toast.success("Article Created!");
        }
        navigate("/dashboard/articles");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      setError(
        error.response?.data?.message ||
          "It could be due to server issues or an invalid image format."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle image delete
  const handleDeleteImg = async () => {
    setLoading(true);
    setError(null);

    try {
      let userChoice = window.confirm(
        `Do you want to delete this Article image and set the Default image?`
      );
      if (userChoice) {
        const response = await axios.delete(
          `${API_URL}/api/article-img/${post._id}`
        );

        if (response) {
          toast.success("Article Img Deleted!");
          navigate("/dashboard/articles");
        }
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {post && (
            <img
              className="rounded-md w-full h-64 md:h-96 object-cover"
              src={post?.img || defaultArticleImg}
              alt="Post"
            />
          )}

          {error && (
            <p className="text-white text-center text-base font-thin italic bg-red-800 my-2 ">
              error: {error}
            </p>
          )}

          <div className="mt-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-2 md:space-y-4"
            >
              {/* Title */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Title*</span>
                </label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  placeholder="Type here..."
                  className="input input-bordered w-full"
                />
              </div>

              {/* Image  */}
              <div className="flex justify-between items-end">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Image</span>
                  </label>
                  <input
                    type="file"
                    {...register("image")}
                    className="file-input w-full"
                  />
                </div>

                <div
                  className="btn btn-sm bg-red-700 text-white"
                  onClick={handleDeleteImg}
                >
                  Delete Image
                </div>
              </div>

              {/* Category & Author */}
              <div className="flex items-center gap-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Category*</span>
                  </label>
                  <select
                    {...register("category", { required: true })}
                    className="select select-bordered"
                  >
                    <option disabled>Select a category</option>
                    <option>Politics</option>
                    <option>Cities</option>
                    <option>Business</option>
                    <option>Education</option>
                    <option>Technology</option>
                    <option>Lifestyle</option>
                    <option>Travel</option>
                    <option>Health</option>
                    <option>Weather</option>
                    <option>Entertainment</option>
                    <option>Sports</option>
                    <option>International</option>
                  </select>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Author</span>
                  </label>
                  <input
                    type="text"
                    {...register("author")}
                    placeholder="Anonymous"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              {/* Breaking News */}
              <div className="flex justify-end">
                <div className="form-control w-36">
                  <label className="cursor-pointer label">
                    <span className="label-text">Breaking News</span>
                    <input
                      type="checkbox"
                      {...register("isBreakingNews")}
                      className="checkbox checkbox-primary"
                    />
                  </label>
                </div>
              </div>

              {/* Content */}
              <div className="form-control">
                <RTE
                  label="Content*"
                  name="content"
                  control={control}
                  defaultValue={post?.content}
                />
              </div>

              {/* Submit Button */}
              <button
                className={`btn my-2 text-white ${
                  post ? "bg-primary" : "bg-green-600"
                } `}
                type="submit"
              >
                {post ? "Update" : "Publish"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PostForm;
