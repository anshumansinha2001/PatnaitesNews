import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileCard from "../components/ProfileCard";
import AdvertisementSideCard from "../components/advertisement/AdvertisementSideCard";
import AdvertisementBottomCard from "../components/advertisement/AdvertisementBottomCard";
import Skeleton from "../components/Loading/Skeleton";
import useFetchArticle from "../hooks/useFetchArticle";
import useFetchSideAds from "../hooks/useFetchSideAds";
import useFetchBottomAds from "../hooks/useFetchBottomAds";

const HomeLayout = () => {
  const [articles, refetch, loading] = useFetchArticle();

  const scrollRef = useRef(); // Ref for scrolling

  // Effect to scroll to top and refetch data on location change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
    refetch(); // Refetch articles
  }, [refetch]);

  // Effect to fetch visitor count on component mount
  useEffect(() => {
    fetch(`/api/visitors/increment`)
      .then((response) => response.json())
      .catch((error) => console.error("Error fetching visitor count:", error));
  }, []);

  // Determine if there are side and bottom advertisements
  const [bottomAds, refetchBottom] = useFetchBottomAds();
  const [sideAds, refetchSideAds, loadingSideAds] = useFetchSideAds();
  const sideAdvertisement = sideAds.length > 0;
  const bottomAdvertisement = bottomAds.length > 0;

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <div className="w-full px-2 lg:px-10 2xl:px-10 min-h-screen lg:h-screen pb-0 ">
        <div className="w-full flex justify-between gap-2 pt-16 md:pt-24 h-full">
          {/* Left portion with profile card */}
          <div className="hidden min-w-60 lg:min-w-72 h-full xl:flex flex-col gap-6 overflow-y-auto">
            <ProfileCard />
          </div>

          {/* Center portion for articles */}
          <div
            ref={scrollRef}
            className="w-full lg:overflow-y-auto no-scrollbar"
          >
            {loading ? <Skeleton /> : <Outlet context={{ articles }} />}
          </div>

          {/* Right portion for side advertisements */}
          <div
            className={`hidden ${
              !sideAdvertisement ? "hidden" : "md:flex"
            } min-w-60 lg:min-w-72 h-full flex-col gap-2 overflow-y-auto no-scrollbar`}
          >
            <p className="text-sm font-thin">Advertisement</p>
            <AdvertisementSideCard />
          </div>
        </div>
      </div>

      {/* Bottom Advertisement Section */}
      <div
        className={`${
          !bottomAdvertisement || loading ? "hidden" : "block"
        } w-full px-2 lg:px-10 my-1 md:my-10 overflow-y-auto no-scrollbar`}
      >
        <AdvertisementBottomCard />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomeLayout;
