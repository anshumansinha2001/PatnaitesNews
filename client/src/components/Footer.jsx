import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer
      className={`flex justify-between items-center bg-[#1c1c27] border-b border-[#66666645] text-neutral-content border-t-2 py-4 px-6 md:px-20 text-[10px] md:text-[1rem] mt-5 md:mt-10`}
    >
      <div className="flex gap-2 md:gap-4 justify-center items-center hover:text-white">
        <div>
          <Logo />
        </div>
        <div>
          <p>
            Patnaites | News Portal
            <br />
            Serving contents since 2016
          </p>
        </div>
      </div>

      <nav className="pl-4 text-center">
        <div className="grid grid-flow-col gap-4 text-xl md:text-2xl">
          <Link to="https://www.facebook.com/patnaite" target="_blank">
            <FaFacebookF className="hover:text-blue-400" />
          </Link>
          <Link to="https://www.instagram.com/patnaite" target="_blank">
            <FaInstagram className="hover:text-orange-500" />
          </Link>
          <Link
            to="https://www.youtube.com/@Patnaites_Official"
            target="_blank"
          >
            <FaYoutube className="hover:text-red-600" />
          </Link>
          <Link to="https://x.com/Patnaites2" target="_blank">
            <FaTwitter className="hover:text-blue-400" />
          </Link>
        </div>
        <section className="mt-2">© 2024 Patnaites.</section>
      </nav>
    </footer>
  );
};

export default Footer;
