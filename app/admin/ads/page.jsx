"use client";

import LoadingAdmin from "@/components/AdminComponents/LoadingAdmin";
import axios from "axios";
import { useEffect, useState } from "react";

const AdsDashboard = () => {
  const [betweenAds, setBetweenAds] = useState([]);
  const [bottomAds, setBottomAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch between ads
  const fetchBetweenAds = async () => {
    try {
      const response = await axios.get("/api/between-ad");
      setBetweenAds(response.data.ads);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch bottom ads
  const fetchBottomAds = async () => {
    try {
      const response = await axios.get("/api/bottom-ad");
      setBottomAds(response.data.ads);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchAdsData = async () => {
      await fetchBetweenAds();
      await fetchBottomAds();
      setLoading(false);
    };
    fetchAdsData();
  }, []);

  if (loading) {
    return <LoadingAdmin />;
  }

  return (
    <div className="w-full px-5 py-8 md:px-10 md:py-10">
      <h1 className="font-serif text-2xl font-bold text-ink md:text-3xl">
        Promotions
      </h1>
      <p className="mt-1 text-sm text-muted">
        Manage the advertisements shown across articles.
      </p>

      <div className="mt-8 grid max-w-xl grid-cols-2 gap-5">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <p className="text-sm text-muted">Between Ads</p>
          <p className="mt-2 text-4xl font-bold text-ink">
            {betweenAds.length}
            <span className="text-lg font-medium text-gray-400"> / 2</span>
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <p className="text-sm text-muted">Bottom Ads</p>
          <p className="mt-2 text-4xl font-bold text-ink">{bottomAds.length}</p>
        </div>
      </div>
    </div>
  );
};

export default AdsDashboard;
