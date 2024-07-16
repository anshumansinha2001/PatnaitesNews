import React from "react";
import { Link } from "react-router-dom";

const AdvertisementInBetweenCard = ({ img, link }) => {
  return (
    <div className="flex justify-center items-center relative">
      {img === "" ? null : (
        <Link to={link ? link : "#"} target="_blank">
          <img
            src={img}
            alt="Failed to load image!"
            className="h-56 md:h-80 xl:h-96 w-screen"
          />
          <p className="absolute top-1 left-1 text-sm text-gray-300 z-10">
            • Ads
          </p>
        </Link>
      )}
    </div>
  );
};

export default AdvertisementInBetweenCard;
