import React, { useEffect } from "react";
import DrawerSide from "../components/admin/DrawerSide";
import { Outlet, useLocation } from "react-router-dom";

const AdminPanel = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className="h-screen overflow-auto">
      <div className="flex flex-col lg:flex-row">
        <div className="flex gap-4 p-2.5 lg:p-0">
          <DrawerSide />
        </div>
        <div className="w-full p-2 lg:p-6 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
