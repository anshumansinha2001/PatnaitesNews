import { Link } from "react-router-dom";
import useFetchBottomAds from "../../hooks/useFetchBottomAds";

const AdvertisementBottomCard = () => {
  const [bottomAds, refetch] = useFetchBottomAds();

  return (
    <div className="flex justify-between items-center gap-1 lg:gap-2 flex-wrap overflow-auto">
      {bottomAds &&
        bottomAds.map((advertisement) => (
          <Link
            to={advertisement.link.length ? advertisement.link : "#"}
            key={advertisement._id}
          >
            <div className="relative">
              <img
                src={advertisement.img}
                alt="Failed to load image!"
                className={`${
                  bottomAds.length === 1
                    ? "w-96 h-full"
                    : "xs:h-[8rem] xs:w-[11.1rem] sm:h-[10rem] sm:w-[12.3rem] md:h-[12rem] md:w-[15.4rem] lg:h-44 lg:w-[18.8rem] xl:h-52 xl:w-[22rem]"
                }`}
              />
              <p className="absolute top-1 left-1 text-sm text-gray-300 z-10">
                • Ads
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default AdvertisementBottomCard;
