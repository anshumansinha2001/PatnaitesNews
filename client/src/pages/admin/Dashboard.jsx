import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "../../components/Loading/Spinner";
import useFetchArticle from "../../hooks/useFetchArticle";
import useFetchBetweenAds from "../../hooks/useFetchBetweenAds";
import useFetchBottomAds from "../../hooks/useFetchBottomAds";
import useFetchSideAds from "../../hooks/useFetchSideAds";
import Logo from "../../components/Logo";

const Dashboard = () => {
  const [articles, refetch] = useFetchArticle();
  const [betweenAds, refetchBetween] = useFetchBetweenAds();
  const [bottomAds, refetchBottom] = useFetchBottomAds();
  const [sideAds, refetchSideAds, loadingSideAds] = useFetchSideAds();

  const [loading, setLoading] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const location = useLocation();

  const API = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    const fetchVisitorCount = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API}/api/show/visitors`);
        const data = await response.json();
        setVisitorCount(data.count);
      } catch (error) {
        console.error("Error fetching visitor count:", error);
      } finally {
        setLoading(false);
      }
    };

    refetch();
    refetchSideAds();
    refetchBetween();
    refetchBottom();
    fetchVisitorCount();
  }, [location]);

  if (loading || loadingSideAds) {
    return <Spinner />;
  }

  return (
    <div className="mt-[15%]">
      <h1 className="my-8 text-3xl md:text-5xl text-center font-bold">
        Hi Admin, <br />
        Welcome to Dashboard
      </h1>

      <div className="flex flex-col md:flex-row shadow mt-10">
        <div className="stat">
          <div className="stat-figure text-primary"></div>
          <div className="stat-title">Page Views</div>
          <div className="stat-value text-primary">{visitorCount || 0}</div>
          <div className="stat-desc">right from the beginning</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary"></div>
          <div className="stat-title">Total Articles</div>
          <div className="stat-value text-secondary">
            {articles.length || 0}
          </div>
          <div className="stat-desc">currently in the database</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <Logo />
              </div>
            </div>
          </div>
          <div className="stat-value">
            {betweenAds?.length + bottomAds?.length + sideAds?.length || 0}
          </div>
          <div className="stat-title">Advertisements going on</div>
          <div className="stat-desc text-secondary">
            Side Ads : {sideAds?.length || 0}
          </div>
          <div className="stat-desc text-secondary">
            Between Ads : {betweenAds?.length || 0}
          </div>
          <div className="stat-desc text-secondary">
            Bottom Ads : {bottomAds?.length || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
