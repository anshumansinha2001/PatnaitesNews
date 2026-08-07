"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import LoadingAdmin from "../AdminComponents/LoadingAdmin";
import { assets } from "@/assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const AdminAdsPost = ({ ad, location, route }) => {
  const { register, handleSubmit, reset, setValue } = useForm();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);

    // If ad exists, set the form values for updating
    if (ad) {
      setValue("link", ad?.link || "");
      setImage(ad?.image || null);
    }
  }, [ad, setValue]);

  const onSubmit = async (data) => {
    if (!image) {
      toast.error("Please add an image!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("link", data.link);

    try {
      setLoading(true);
      let response;

      if (ad) {
        // Update existing ad if 'ad' object is provided
        response = await axios.put(`/api/${route}?id=${ad._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.info("Ad updated successfully");
      } else {
        // Create new ad if 'ad' is not provided
        response = await axios.post(`/api/${route}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Ad created successfully");
      }
      // Check if backend sent an error message about document limit
      if (response?.data?.success === false) {
        throw new Error(response.data.message); // Throw the error to be caught in catch block
      }

      router.push(`/admin/ads/${location}`);
      reset();
      setImage(null);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to submit ad."
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const imagePreview = useMemo(() => {
    return image
      ? typeof image === "string"
        ? image
        : URL.createObjectURL(image)
      : assets.upload_area;
  }, [image]);

  if (loading) return <LoadingAdmin />;

  return (
    <div className="w-full px-5 py-8 md:px-10 md:py-10">
      <h1 className="font-serif text-2xl font-bold text-ink md:text-3xl">
        {ad ? "Edit Advertisement" : "Create Advertisement"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 max-w-xl space-y-6 rounded-2xl border border-gray-200 bg-white p-6 md:p-8"
      >
        {/* Image Upload Section */}
        <div>
          <p className="mb-1.5 block text-sm font-semibold text-ink">
            Ad Image
          </p>
          <label htmlFor="image" className="block w-fit cursor-pointer">
            <Image
              className="h-[200px] w-[350px] rounded-xl border border-gray-200 object-cover"
              src={imagePreview}
              alt="upload area"
              width={350}
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

        {/* Link Input */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink">
            Link
          </label>
          <input
            {...register("link")}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
            type="text"
            placeholder="Link of this advertisement (optional)"
          />
        </div>

        {/* Submit Button */}
        <button
          className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          type="submit"
        >
          {ad ? "Update Ad" : "Create Ad"}
        </button>
      </form>
    </div>
  );
};

export default AdminAdsPost;
