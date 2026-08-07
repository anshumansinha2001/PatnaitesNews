"use client";
import LoadingAdmin from "@/components/AdminComponents/LoadingAdmin";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("/api/contact");
        if (response.data.success) {
          setContacts(response.data.contacts);
        } else {
          toast.error("Failed to load contacts");
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
        toast.error("Error loading contacts");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Delete contact function
  const deleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?"))
      return;

    try {
      setLoading(true);
      await axios.delete(`/api/contact?id=${id}`);
      setContacts(contacts.filter((contact) => contact._id !== id));
      toast.info("Contact deleted successfully!");
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Error deleting contact");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingAdmin />;

  return (
    <div className="px-5 py-8 md:px-10 md:py-10">
      <h1 className="font-serif text-2xl font-bold text-ink md:text-3xl">
        Contacts
      </h1>
      <p className="mt-1 text-sm text-muted">
        {contacts.length} message{contacts.length === 1 ? "" : "s"} received
      </p>

      {contacts.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center text-muted">
          Nobody has contacted yet.
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div>
                <h2 className="text-lg font-semibold text-ink">
                  {contact.name}
                </h2>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm text-accent hover:underline"
                >
                  {contact.email}
                </a>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  {contact.message}
                </p>
              </div>
              <button
                onClick={() => deleteContact(contact._id)}
                className="mt-6 w-fit rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
