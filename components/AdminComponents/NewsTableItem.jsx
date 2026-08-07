"use client";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const NewsTableItem = ({
  title,
  image,
  category,
  updatedAt,
  author,
  _id,
  slug,
  deleteArticle,
}) => {
  const formatDate = moment(updatedAt).format("MMMM Do YYYY");
  const router = useRouter();
  return (
    <tr className="border-b border-gray-100 text-center transition-colors last:border-0 hover:bg-gray-50">
      <td className="px-6 py-3">
        <Image
          src={image || `/favicon.ico`}
          width={56}
          height={40}
          className="mx-auto h-10 w-14 rounded-md object-cover"
          alt={title || "article image"}
        />
      </td>
      <td className="px-6 py-3 text-left font-medium text-ink">
        {title ? title.slice(0, 45).concat(title.length > 45 ? "…" : "") : "Title"}
      </td>
      <td className="px-6 py-3">
        <span className="inline-block rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-ink">
          {category || "—"}
        </span>
      </td>
      <td className="whitespace-nowrap px-6 py-3 text-xs text-muted">
        {formatDate || "—"}
      </td>
      <td className="px-6 py-3 text-muted">{author || "—"}</td>
      <td className="px-6 py-3">
        <button
          onClick={() => router.push(`/admin/update-news/${slug}`)}
          className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
        >
          Update
        </button>
      </td>
      <td className="px-6 py-3">
        <button
          onClick={() => deleteArticle(_id)}
          aria-label="Delete article"
          className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default NewsTableItem;
