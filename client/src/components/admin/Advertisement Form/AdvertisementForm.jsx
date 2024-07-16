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
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Set default form values when advertisment data is loaded
  React.useEffect(() => {
    if (advertisment) {
      setValue("img", advertisment.img);
      setValue("link", advertisment.link || "");
    }
  }, [advertisment, setValue]);

  const API = import.meta.env.VITE_BACKEND_API_URL;

  // Form submission handler
  const onSubmit = async (formData) => {
    setLoading(true);
    setError(false);

    try {
      // If advertisment exists, update it
      if (advertisment) {
        const response = await axios.put(
          `${API}/api/${updateAPI}/${advertisment._id}`,
          formData
        );
        if (response) {
          toast.info("Advertisement Updated!");
          navigate(`${API}/dashboard/${updateAPI}`);
        }
      } else {
        // Else, create a new advertisement
        const response = await axios.post(`${API}/api/${createAPI}`, formData);
        if (response) {
          toast.success("Advertisement Created!");
          navigate(`/dashboard/${createAPI}`);
        }
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setErrorMsg(error.response?.data?.message || "Something went wrong!");
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
              Error: {errorMsg}
            </p>
          )}

          <div className="mt-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Image URL input */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Image URL*</span>
                </label>
                <input
                  type="text"
                  {...register("img", { required: true })}
                  placeholder="Type image URL"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Uncomment this if you need file upload functionality with Multer */}
              {/* <div className="form-control w-full max-w-xs my-6">
                <label className="label">
                  <span className="label-text">Image*</span>
                </label>
                <input
                  type="file"
                  {...register("image", { required: true })}
                  className="file-input w-full"
                />
              </div> */}

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
