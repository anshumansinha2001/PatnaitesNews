import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../redux/themeSlice";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  //Handling Scroll Functions
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handling togle dropdown menu
  const toggleDropdown = () => {
    if (isDropdownOpen) {
      return setIsDropdownOpen(!isDropdownOpen);
    }
    return setIsDropdownOpen(true);
  };

  // Handling THEME mode
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.themeMode);

  const toggleTheme = () => {
    if (themeMode === "light") {
      dispatch(darkTheme());
    } else {
      dispatch(lightTheme());
    }
  };

  const navItems = (
    <>
      <li onClick={() => setIsDropdownOpen(true)}>
        <Link
          to="/"
          className="hover:text-blue-400 mx-1 my-1 md:my-0 text-sm md:text-[1.1rem]"
        >
          Home
        </Link>
      </li>
      <li onClick={() => setIsDropdownOpen(true)}>
        <Link
          to="/weather"
          className="hover:text-blue-400 mx-1 my-1 md:my-0 text-sm md:text-[1.1rem]"
        >
          Weather
        </Link>
      </li>
      <li onClick={() => setIsDropdownOpen(true)}>
        <Link
          to="/sports"
          className="hover:text-blue-400 mx-1 my-1 md:my-0 text-sm md:text-[1.1rem]"
        >
          Sports
        </Link>
      </li>
      <li onClick={() => setIsDropdownOpen(true)}>
        <Link
          to="/health"
          className="hover:text-blue-400 mx-1 my-1 md:my-0 text-sm md:text-[1.1rem]"
        >
          Health
        </Link>
      </li>
      <li onClick={() => setIsDropdownOpen(true)}>
        <Link
          to="/business"
          className="hover:text-blue-400 mx-1 my-1 md:my-0 text-sm md:text-[1.1rem]"
        >
          Business
        </Link>
      </li>
      <li onClick={() => setIsDropdownOpen(true)}>
        <Link
          to="/politics"
          className="hover:text-blue-400 mx-1 my-1 md:my-0 text-sm md:text-[1.1rem]"
        >
          Politics
        </Link>
      </li>
      <li onClick={() => setIsDropdownOpen(true)}>
        <Link
          to="/education"
          className="hover:text-blue-400 mx-1 my-1 md:my-0 text-sm md:text-[1.1rem]"
        >
          Education
        </Link>
      </li>
      <li onClick={() => setIsDropdownOpen(true)}>
        <Link
          to="/entertainment"
          className="hover:text-blue-400 mx-1 my-1 md:my-0 text-sm md:text-[1.1rem]"
        >
          Entertainment
        </Link>
      </li>
      <li onClick={() => setIsDropdownOpen(true)}>
        <Link
          to="/international"
          className="hover:text-blue-400 mx-1 my-1 md:my-0 text-sm md:text-[1.1rem]"
        >
          International
        </Link>
      </li>
    </>
  );

  const navDropdown = (
    <>
      <li tabIndex={0}>
        <details className="text-xs md:text-[1rem]">
          <summary
            className={`mx-1 md:my-1 border ${
              themeMode === "light" ? "border-black" : "border-white"
            }`}
          >
            Inquiry
          </summary>

          <ul className="space-y-2 md:space-y-4">
            <li>
              <Link to="/">Services</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/">ContactUs</Link>
            </li>
          </ul>
        </details>
      </li>
    </>
  );

  return (
    <header className="fixed px-0 lg:px-10 top-0 left-0 right-0 z-50">
      <div
        className={`navbar p-2 lg:p-0 bg-base-100 ${
          isSticky
            ? "shadow-md shadow-b bg-base-100 transition-all duration-300 ease-in-out"
            : null
        }`}
      >
        <div className="navbar-start gap-1">
          <button
            className="dropdown lg:hidden border rounded-lg shadow-md"
            onClick={toggleDropdown}
          >
            <div
              tabIndex={0}
              role="button"
              className="btn-ghost px-2 py-1.5 lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content ${
                isDropdownOpen ? "hidden" : "display"
              } bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow`}
            >
              {navItems}
            </ul>
          </button>
          <button
            onClick={handleClick}
            className="btn btn-ghost text-lg md:text-2xl px-2"
          >
            <span className="flex gap-1.5 xl:hidden">
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
            </span>

            <div className="hidden font-serif xl:flex underline underline-offset-4 text-lg text-black bg-white p-1.5 rounded">
              HEAD
              <span className="text-red-600">LINES</span>
            </div>
          </button>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>

        <div className="navbar-end">
          {/* DARK MODE */}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              onChange={toggleTheme}
              checked={themeMode === "dark"}
            />

            {/* sun icon */}
            <svg
              className="swap-off fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-on fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
          <div>
            <ul className="menu menu-horizontal">{navDropdown}</ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
