import moment from "moment";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdvertisementTable = ({
  title,
  advertisments,
  updateRoute,
  deleteAPI,
  refetch,
}) => {
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;

  // Handle Delete Ads
  const handleDeleteAds = async (advertisment) => {
    try {
      let userChoice = window.confirm("Do you want to Delete this Add?");
      if (userChoice) {
        await axios.delete(`${API_URL}/api/${deleteAPI}/${advertisment._id}`);
        toast.success("Advertisment deleted!");
        refetch();
      } else {
        return;
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="overflow-x-auto rounded-md shadow-md">
      <table className="table table-zebra">
        {/* head */}
        <thead className="text-center text-white bg-red-800">
          <tr>
            <th>#</th>
            <th>{title}</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {/* row 1 */}
          {advertisments.length ? (
            advertisments.map((advertisment, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td className=" min-w-96">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-48 h-28">
                        <img src={advertisment.img} alt="Failed load" />
                      </div>
                    </div>
                    <div className="flex flex-col justify-start text-start gap-1">
                      <div className="flex gap-2">
                        <span className="badge badge-ghost badge-sm">
                          {moment(advertisment?.createdAt).fromNow()}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <Link to={`/dashboard/${updateRoute}/${advertisment._id}`}>
                    <button className="btn btn-sm bg-primary text-white">
                      <FaEdit />
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteAds(advertisment)}
                    className="btn btn-ghost btn-sm text-orange-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                404! No advertisements found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdvertisementTable;
