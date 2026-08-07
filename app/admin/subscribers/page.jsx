"use client";

import LoadingAdmin from "@/components/AdminComponents/LoadingAdmin";
import SubsTableItem from "@/components/AdminComponents/SubsTableItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch email by axios
  const fetchEmails = async () => {
    try {
      const response = await axios.get("/api/email");
      setEmails(response.data.emails);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching emails:", error);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  // delete email
  const deleteEmail = async (emailId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this email?"
    );

    if (!userConfirmed) return;

    try {
      await axios.delete(`/api/email`, {
        params: { id: emailId },
      });
      fetchEmails();
      toast.success("Email deleted successfully");
    } catch (error) {
      toast.error("Failed to delete email");
      console.error("Error deleting email:", error);
    }
  };

  if (loading) {
    return <LoadingAdmin />;
  }

  return (
    <div className="px-5 py-8 md:px-10 md:py-10">
      <h1 className="font-serif text-2xl font-bold text-ink md:text-3xl">
        Subscribers
      </h1>
      <p className="mt-1 text-sm text-muted">
        {emails.length} newsletter subscriber{emails.length === 1 ? "" : "s"}
      </p>

      <div className="relative mt-6 max-h-[78vh] max-w-2xl overflow-auto rounded-2xl border border-gray-200 bg-white shadow-sm scrollbar-hide">
        <table className="w-full text-sm text-gray-600">
          <thead className="sticky top-0 bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-6 py-4">Email Subscription</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {emails.map((email) => (
              <SubsTableItem
                key={email._id}
                {...email}
                deleteEmail={deleteEmail}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
