import moment from "moment";
import React from "react";

const SubsTableItem = ({ email, updatedAt, _id, deleteEmail }) => {
  const formatDate = moment(updatedAt).format("MMMM Do YYYY, h:mm:ss a");
  return (
    <tr className="border-b border-gray-100 text-left transition-colors last:border-0 hover:bg-gray-50">
      <th scope="row" className="whitespace-nowrap px-6 py-3 font-medium text-ink">
        {email || "No Email"}
      </th>
      <td className="whitespace-nowrap px-6 py-3 text-xs text-muted">
        {formatDate || "—"}
      </td>
      <td className="px-6 py-3">
        <button
          onClick={() => deleteEmail(_id)}
          aria-label="Delete subscriber"
          className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default SubsTableItem;
