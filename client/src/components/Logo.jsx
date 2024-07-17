import React from "react";
import useFetchProfile from "../hooks/useFetchProfile";
import defaultLogo from "../assets/default_logo.jpg";

const Logo = () => {
  const [data] = useFetchProfile();
  return (
    <img
      src={data.logo || defaultLogo}
      alt="logo"
      className="w-8 md:w-14 object-cover rounded-full"
    />
  );
};

export default Logo;
