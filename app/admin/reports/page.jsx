"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingAdmin from "@/components/AdminComponents/LoadingAdmin";
import Image from "next/image";
import Link from "next/link";

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("/api/report");
        if (response.data.success) {
          setReports(response.data.reports);
        } else {
          toast.error("Failed to load reports");
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
        toast.error("Error loading reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Delete report function
  const deleteReport = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;

    try {
      setLoading(true);
      await axios.delete(`/api/report?id=${id}`); // API endpoint to delete ad by id
      setLoading(false);
      toast.info("Report deleted successfully!");
      setReports(reports.filter((report) => report._id !== id));
    } catch (error) {
      console.log(error);

      setLoading(false);
      toast.error("Error deleting report");
    }
  };

  // Store Report ID to session storage
  const storeReportId = (id) => {
    const reportId = sessionStorage.getItem("reportId");
    if (reportId) {
      sessionStorage.removeItem("reportId");
    }
    sessionStorage.setItem("reportId", id);
  };

  if (loading) {
    return <LoadingAdmin />;
  }

  return (
    <div className="px-5 py-8 md:px-10 md:py-10">
      <h1 className="font-serif text-2xl font-bold text-ink md:text-3xl">
        Reports
      </h1>
      <p className="mt-1 text-sm text-muted">
        {reports.length} report{reports.length === 1 ? "" : "s"} submitted
      </p>

      {reports.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center text-muted">
          Nobody has reported anything yet.
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <div
              key={report._id}
              className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <Link
                href={`/admin/update-news/${report.articleSlug}`}
                className="relative block aspect-[16/10] overflow-hidden bg-gray-100"
              >
                <Image
                  onClick={() => storeReportId(report._id)}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  src={report.articleImage}
                  width={400}
                  height={250}
                  alt={report.articleTitle}
                />
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-semibold text-ink">
                  {report.articleTitle}
                </h2>
                <p className="mt-3 text-sm text-gray-600">
                  <span className="font-semibold text-ink">Reason:</span>{" "}
                  {report.reason}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  <span className="font-semibold text-ink">Description:</span>{" "}
                  {report.description || "No description provided"}
                </p>
                <button
                  onClick={() => deleteReport(report._id)}
                  className="mt-auto pt-4 text-left text-sm font-semibold text-accent hover:underline"
                >
                  Delete report
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReports;
