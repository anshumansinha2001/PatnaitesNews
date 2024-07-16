import React, { useEffect, useState } from "react";
import RTE from "./RTE";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../Loading/Spinner";

const PostForm = ({ post }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      id: post?._id,
      title: post?.title || "",
      category: post?.category || "",
      author: post?.author || "",
      isBreakingNews: post?.isBreakingNews || false,
      content: post?.content || "",
      // img: post?.img,
    },
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API = import.meta.env.VITE_BACKEND_API_URL;

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      if (data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      const response = post
        ? await axios.put(`${API}/api/article/${post._id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        : await axios.post(`${API}/api/article`, formData, {
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
    } catch (err) {
      toast.error("Something went wrong!");
      setError(
        err.response?.data?.message ||
          "It could be due to server issues or an invalid image format."
      );
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
              src={
                post?.img ||
                "https://plus.unsplash.com/premium_photo-1688561384438-bfa9273e2c00?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
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
              className="space-y-2 md: space-y-4"
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
                    <option>Weather</option>
                    <option>Sports</option>
                    <option>Health</option>
                    <option>Business</option>
                    <option>Education</option>
                    <option>Entertainment</option>
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
