import Link from "next/link";
import React from "react";
import { FiPlus, FiEdit } from "react-icons/fi";

const linkBase =
  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors";

const AdminAdsSidebar = () => {
  return (
    <div className="w-56 shrink-0 p-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Between Ads
          </p>
          <div className="mt-3 space-y-2">
            <Link
              href="/admin/ads/between-ads/create"
              className={`${linkBase} bg-ink text-white hover:bg-accent`}
            >
              <FiPlus /> Create New
            </Link>
            <Link
              href="/admin/ads/between-ads"
              className={`${linkBase} border border-gray-200 text-ink hover:border-accent hover:text-accent`}
            >
              <FiEdit /> Update / Delete
            </Link>
          </div>
        </div>

        <hr className="my-5 border-gray-100" />

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Bottom Ads
          </p>
          <div className="mt-3 space-y-2">
            <Link
              href="/admin/ads/bottom-ads/create"
              className={`${linkBase} bg-ink text-white hover:bg-accent`}
            >
              <FiPlus /> Create New
            </Link>
            <Link
              href="/admin/ads/bottom-ads"
              className={`${linkBase} border border-gray-200 text-ink hover:border-accent hover:text-accent`}
            >
              <FiEdit /> Update / Delete
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAdsSidebar;
