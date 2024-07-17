import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useFetchSideAds from "../../hooks/useFetchSideAds";
import Spinner from "../Loading/Spinner";

const AdvertisementSideCard = () => {
  const [sideAds, refetch, loading] = useFetchSideAds();
  const location = useLocation();

  useEffect(() => {
    refetch();
  }, [location]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex gap-2 flex-col">
          {sideAds.map((advertisement) => (
            <Link
              to={advertisement.link.length ? advertisement.link : "#"}
              key={advertisement._id}
            >
              <img
                src={advertisement?.img}
                alt="Failed to load image!"
                className="h-48 w-72 hover:-translate-y-6 transition-all duration-300 hover:rounded-xl hover:shadow-md"
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default AdvertisementSideCard;
