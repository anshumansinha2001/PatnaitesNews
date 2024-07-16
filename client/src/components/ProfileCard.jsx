import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsBriefcase, BsFacebook, BsInstagram } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { CiLocationOn, CiMail } from "react-icons/ci";
import moment from "moment";
import useFetchProfile from "../hooks/useFetchProfile";
import Logo from "./Logo";

const ProfileCard = () => {
  const [data, loading] = useFetchProfile();

  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [date, setDate] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    const updateDateAtMidnight = () => {
      const now = new Date();
      const msUntilMidnight =
        new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + 1
        ).getTime() - now.getTime();
      setTimeout(() => {
        setDate(new Date().toLocaleDateString());
        updateDateAtMidnight();
      }, msUntilMidnight);
    };

    updateDateAtMidnight();

    return () => {
      clearInterval(timeInterval);
    };
  }, []);
  return (
    <div>
      <div className="w-full mt-0 md:mt-10 flex flex-col items-center border border-[#7d7c7c45] shadow-md rounded-xl px-6 py-4">
        <div className="w-full flex items-center justify-between border-b pb-5 border-[#66666645]">
          <div className="flex gap-2">
            <Logo />

            <div className="flex flex-col justify-center">
              <p className="flex gap-1.5 text-lg font-medium ">
                Patnaites
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
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
              </p>
              <span>News Portal</span>
            </div>
          </div>

          <Link to={`mailto:${data?.mail}`}>
            <CiMail size={22} className="text-blue cursor-pointer" />
          </Link>
        </div>

        <div className="w-full flex flex-col gap-2 py-4 border-b border-[#66666645]">
          <p className="text-lg font-semibold">Profile</p>
          <div className="flex gap-2 items-center ">
            <CiLocationOn className="text-xl " />
            <span>Patna, Bihar</span>
          </div>

          <div className="flex gap-2 items-center ">
            <BsBriefcase className=" text-lg " />
            <Link
              className="text-blue-400 font-medium underline underline-offset-4"
              to={data?.portfolio}
              target="_blank"
            >
              Portfolio
            </Link>
          </div>
        </div>

        <div
          className={`${
            loading ? "hidden" : "flex"
          } w-full  flex-col gap-2 py-4 border-b border-[#66666645]`}
        >
          <p className=" text-lg font-semibold">Followers</p>

          <div className="flex items-center ">
            <Link
              className="flex items-center gap-2 hover:text-blue-600"
              to="https://www.facebook.com/patnaite"
              target="_blank"
            >
              <BsFacebook className=" text-xl " />
              <span>{data.fbFollowers}</span>
            </Link>
          </div>

          <div className="flex items-center ">
            <Link
              className="flex items-center gap-2 hover:text-orange-500"
              to="https://www.instagram.com/patnaite"
              target="_blank"
            >
              <BsInstagram className=" text-xl " />
              <span>{data.instaFollowers}</span>
            </Link>
          </div>

          <div className="flex items-center ">
            <Link
              className="flex items-center gap-2 hover:text-red-500"
              to="https://www.youtube.com/@Patnaites_Official"
              target="_blank"
            >
              <FaYoutube className=" text-xl " />
              <span>{data.ytFollowers}</span>
            </Link>
          </div>
        </div>

        <div className="w-full flex flex-col gap-1 py-4 pb-6">
          <p className="text-lg  font-semibold">Dispay</p>

          <div className="flex items-center justify-between">
            <span>Today's Date</span>
            <span>{date}</span>
          </div>

          <div className="flex items-center justify-between">
            <span>Today's Time</span>
            <span>{time}</span>
          </div>

          <div className="flex items-center justify-between">
            <span>Joined</span>
            <span>{moment("2016-06-30 10:00:00").fromNow()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
