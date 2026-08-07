"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingAdmin from "@/components/AdminComponents/LoadingAdmin";
import { toast } from "react-toastify";

const Page = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch all ads
  const fetchAds = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/between-ad");
      console.log(response);

      setAds(response.data.ads);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);

      toast.error("Failed to fetch ads!");
    }
  };

  // Delete ad by id
  const deleteAd = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;

    try {
      setLoading(true);
      await axios.delete(`/api/between-ad?id=${id}`); // API endpoint to delete ad by id
      setLoading(false);
      toast.info("Ad deleted successfully!");
      fetchAds(); // Refresh the list after deleting
    } catch (error) {
      console.log(error);

      setLoading(false);
      toast.error("Failed to delete ad!");
    }
  };

  // Fetch ads when component mounts
  useEffect(() => {
    fetchAds();
  }, []);

  if (loading) return <LoadingAdmin />; // Loading condition fixed

  return (
    <div className="w-full px-5 py-8 md:px-10 md:py-10">
      <h1 className="font-serif text-2xl font-bold text-ink md:text-3xl">
        Between Ads
      </h1>
      <p className="mt-1 text-sm text-muted">
        Ads shown between article paragraphs.
      </p>

      <div className="relative mt-6 max-h-[78vh] overflow-auto rounded-2xl border border-gray-200 bg-white shadow-sm scrollbar-hide">
        <table className="w-full text-sm text-gray-600">
          <thead className="sticky top-0 z-20 bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr className="text-center">
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Link</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">Delete</th>
            </tr>
          </thead>

          <tbody>
            {ads.length > 0 ? (
              ads.map((ad) => (
                <tr
                  key={ad._id}
                  className="border-b border-gray-100 text-center last:border-0 hover:bg-gray-50"
                >
                  <td className="px-6 py-3">
                    <Image
                      src={ad.image || `/favicon.ico`}
                      width={200}
                      height={120}
                      className="mx-auto h-[80px] w-[130px] rounded-md object-cover"
                      alt="ad image"
                      loading="eager"
                    />
                  </td>
                  <td className="max-w-[220px] truncate px-6 py-3 text-left text-muted">
                    {ad.link || "N/A"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3 text-xs text-muted">
                    {ad.updatedAt
                      ? moment(ad.updatedAt).format("MMMM Do YYYY")
                      : "unknown"}
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() =>
                        router.push(`/admin/ads/between-ads/update/${ad._id}`)
                      }
                      className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                    >
                      Update
                    </button>
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => deleteAd(ad._id)}
                      className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-muted">
                  No ads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
