import React from "react";
import { CgProfile } from "react-icons/cg";
import { CiHome, CiLogout } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import {
  MdDashboardCustomize,
  MdManageHistory,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { Link } from "react-router-dom";

const DrawerSide = () => {
  const closeDrawer = () => {
    document.getElementById("my-drawer-2").checked = false;
  };

  return (
    <div className="relative lg:drawer-open z-20">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <label
        htmlFor="my-drawer-2"
        className="btn btn-primary text-white btn-sm drawer-button lg:hidden"
      >
        <MdDashboardCustomize size={20} />
      </label>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {/* Sidebar content here */}
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 gap-4">
          <Link
            className="flex gap-2 items-center p-4 text-3xl font-serif"
            onClick={closeDrawer}
          >
            <MdOutlineAdminPanelSettings />
            Admin Panel
          </Link>
          <div className="space-y-2 text-base lg:text-lg border border-[#7d7c7c45] rounded-md p-2">
            <div className="divider">
              <h2 className="text-sm font-mono items-center flex justify-end gap-1">
                Manage All
              </h2>
            </div>

            <li>
              <Link to="/dashboard/articles" onClick={closeDrawer}>
                <MdManageHistory size={20} />
                Articles
              </Link>
            </li>
            <li>
              <Link to="/dashboard/side-ads" onClick={closeDrawer}>
                <MdManageHistory size={20} /> Side Advertisements
              </Link>
            </li>
            <li>
              <Link to="/dashboard/between-ads" onClick={closeDrawer}>
                <MdManageHistory size={20} />
                Between Advertisements
              </Link>
            </li>
            <li>
              <Link to="/dashboard/bottom-ads" onClick={closeDrawer}>
                <MdManageHistory size={20} />
                Bottom Advertisements
              </Link>
            </li>
          </div>

          <div className="space-y-2 text-base lg:text-lg border border-[#7d7c7c45] rounded-md p-2">
            <div className="divider">
              <h2 className="text-sm font-mono items-center flex justify-end gap-1">
                Create New
              </h2>
            </div>
            <li>
              <Link to="/dashboard/create-article" onClick={closeDrawer}>
                <IoAddCircleOutline size={20} /> Article
              </Link>
            </li>
            <li>
              <Link to="/dashboard/create-side-ad" onClick={closeDrawer}>
                <IoAddCircleOutline size={20} /> Side Advertisement
              </Link>
            </li>
            <li>
              <Link to="/dashboard/create-between-ad" onClick={closeDrawer}>
                <IoAddCircleOutline size={20} /> Between Advertisement
              </Link>
            </li>
            <li>
              <Link to="/dashboard/create-bottom-ad" onClick={closeDrawer}>
                <IoAddCircleOutline size={20} /> Bottom Advertisement
              </Link>
            </li>
          </div>

          <div className="flex items-center justify-around text-2xl border border-[#7d7c7c45] rounded p-4">
            <Link to="/dashboard/logout">
              <CiLogout />
            </Link>
            <Link to="/">
              <CiHome />
            </Link>
            <Link to="/dashboard/profile" onClick={closeDrawer}>
              <CgProfile />
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DrawerSide;
