import React, { useState } from "react";
import useFetchProfile from "../../../hooks/useFetchProfile";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Spinner from "../../../components/Loading/Spinner";

const Profile = () => {
  const [data, loading, setLoading] = useFetchProfile();
  const { register, handleSubmit, setValue } = useForm();

  // console.log("PROFILE", data);

  const navigate = useNavigate();

  const [error, setError] = useState(null);

  // Set default form values when data is loaded
  React.useEffect(() => {
    if (data) {
      setValue("logo", data?.logo);
      setValue("mail", data.mail);
      setValue("portfolio", data.portfolio);
      setValue("fbFollowers", data.fbFollowers);
      setValue("instaFollowers", data.instaFollowers);
      setValue("ytFollowers", data.ytFollowers);
    }
  }, [data, setValue]);

  const onSubmit = async (submitedData) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      for (const key in submitedData) {
        formData.append(key, submitedData[key]);
      }

      // Check if a new image is uploaded
      if (submitedData.image && submitedData.image.length > 0) {
        formData.append("image", submitedData.image[0]);
      }

      const response = await axios.put(`/api/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response) {
        toast.info("Profile Updated!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.lof(error);
      toast.error("Something went wrong!");
      setError(
        error.response?.data?.message ||
          "It could be due to server issues or an invalid image format."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handling logo delete
  const handleDeleteLogo = async () => {
    setLoading(true);
    setError(null);

    try {
      let userChoice = window.confirm(
        `Do you want to delete this logo and set the Default logo?`
      );
      if (userChoice) {
        const response = await axios.delete(`/api/profile/delete-logo`);

        if (response) {
          toast.success("Logo Deleted!");
          navigate("/dashboard");
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
        <div className="w-full md:w-[870px] px-4 mx-auto rounded-md shadow-md p-2">
          <div className="flex items-center justify-between">
            <h2 className="flex gap-1 text-3xl md:text-4xl font-serif font-semibold">
              {data?.name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6"
                viewBox="0 0 48 48"
              >
                <polygon
                  fill="#42a5f5"
                  points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"
                ></polygon>
                <polygon
                  fill="#fff"
                  points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"
                ></polygon>
              </svg>
            </h2>
            <img
              className="rounded-full w-20 h-20 md:h-28 object-cover md:w-28"
              src={data?.logo}
              alt="Profile Logo"
            />
          </div>

          {error && (
            <p className="text-white text-center text-base font-thin italic bg-red-800 my-2">
              Error: {error}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* Logo section */}
            <div className="flex justify-between items-end">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Logo</span>
                </label>
                <input
                  type="file"
                  {...register("image")}
                  className="file-input w-full"
                />
              </div>

              <div
                className="btn btn-sm bg-red-700 text-white"
                onClick={handleDeleteLogo}
              >
                Delete logo
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Mail</span>
              </label>
              <input
                type="text"
                {...register("mail", { required: true })}
                placeholder="Type here..."
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Portfolio URL</span>
              </label>
              <input
                type="text"
                {...register("portfolio", { required: true })}
                placeholder="Type link URL here..."
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Facebook Followers</span>
              </label>
              <input
                type="text"
                {...register("fbFollowers", { required: true })}
                placeholder="Type here..."
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Instagram Followers</span>
              </label>
              <input
                type="text"
                {...register("instaFollowers", { required: true })}
                placeholder="Type here..."
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">YouTube Followers</span>
              </label>
              <input
                type="text"
                {...register("ytFollowers", { required: true })}
                placeholder="Type here..."
                className="input input-bordered w-full"
              />
            </div>

            <button className="btn my-2 text-white bg-primary" type="submit">
              Update
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Profile;
