import React from "react";
import useFetchProfile from "../hooks/useFetchProfile";

const Logo = () => {
  const [data] = useFetchProfile();
  return (
    <img
      src={data.logo}
      alt="logo"
      className="w-8 md:w-14 object-cover rounded-full"
    />
  );
};

export default Logo;
