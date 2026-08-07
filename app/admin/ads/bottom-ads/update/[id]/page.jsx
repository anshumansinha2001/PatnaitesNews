"use client";
import LoadingAdmin from "@/components/AdminComponents/LoadingAdmin";
import AdminAdsPost from "@/components/AdsComponents/AdminAdsPost";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateBottomAd = ({ params }) => {
  const { id } = params; // Assuming you are passing the ad ID in the URL parameters
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch ad by ID
  const fetchAdById = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/bottom-ad?id=${id}`);
      setAd(response.data.ad);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch ad!");
      console.log(error);
    }
  }, [id]);

  // Fetch ad when component mounts
  useEffect(() => {
    fetchAdById();
  }, [fetchAdById]);

  if (loading) return <LoadingAdmin />;

  if (!ad)
    return (
      <div className="px-5 py-10 text-muted md:px-10">No ad found!</div>
    );

  return <AdminAdsPost ad={ad} location="bottom-ads" route="bottom-ad" />;
};

export default UpdateBottomAd;
