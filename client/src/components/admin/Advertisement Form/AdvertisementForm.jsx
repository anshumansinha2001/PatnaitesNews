import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../Loading/Spinner";

const AdvertisementForm = ({ title, advertisment, createAPI, updateAPI }) => {
  const { register, handleSubmit, setValue } = useForm();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Set default form values when advertisment data is loaded
  React.useEffect(() => {
    if (advertisment) {
      setValue("image", advertisment?.img);
      setValue("link", advertisment?.link);
    }
  }, [advertisment, setValue]);

  // Form submission handler
  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      // Check if a new image is uploaded
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      const response = advertisment
        ? await axios.put(`/api/${updateAPI}/${advertisment._id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        : await axios.post(`/api/${createAPI}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

      if (response) {
        if (advertisment) {
          toast.info("Advertisement Updated!");
          navigate(`/dashboard/${updateAPI}`);
        } else {
          toast.success("Advertisement Created!");
          navigate(`/dashboard/${createAPI}`);
        }
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

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full md:w-[870px] px-4 mx-auto">
          <div className="flex flex-col">
            <h2 className="text-3xl md:text-4xl font-semibold my-4 underline underline-offset-4">
              {title}
            </h2>
            {advertisment && (
              <img
                className="rounded-md w-full h-64 md:h-96"
                src={advertisment.img}
                alt="Advertisement"
              />
            )}
          </div>

          {error && (
            <p className="text-white text-center text-base font-thin italic bg-red-800 my-2">
              error: {error}
            </p>
          )}

          <div className="mt-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Image input */}
              <div className="form-control w-full max-w-xs my-6">
                <label className="label">
                  <span className="label-text">Image*</span>
                </label>
                <input
                  type="file"
                  {...register("image")}
                  className="file-input w-full"
                />
              </div>

              {/* Link input */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Link</span>
                </label>
                <input
                  type="text"
                  {...register("link")}
                  placeholder="Type any integrated link with this Ad..."
                  className="input input-bordered w-full"
                />
              </div>

              {/* Submit button */}
              <button className="btn my-2 text-white bg-primary">
                {advertisment ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdvertisementForm;
