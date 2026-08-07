"use client";
import Sidebar from "@/components/AdminComponents/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingAdmin from "@/components/AdminComponents/LoadingAdmin";
import Topbar from "@/components/AdminComponents/Topbar";

export default function AdminLayout({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem("cache"));

    if (isAuthenticated?.length !== 666) {
      setIsAdmin(false);
      router.push("/admin-login");
    } else {
      setIsAdmin(true);
    }
  }, [router]);

  if (!isAdmin) return <LoadingAdmin />;

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      <ToastContainer theme="dark" position="top-right" />

      {/* Mobile top bar */}
      <div className="md:hidden">
        <Topbar />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
