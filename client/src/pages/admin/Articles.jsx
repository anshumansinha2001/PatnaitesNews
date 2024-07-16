import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaFilter, FaTrash } from "react-icons/fa";
import moment from "moment";
import useFetchArticle from "../../hooks/useFetchArticle";
import Spinner from "../../components/Loading/Spinner";
import axios from "axios";
import { toast } from "react-toastify";

const Articles = () => {
  const [articles, refetch, loading] = useFetchArticle();
  const [category, setCategory] = useState("All");

  // Filter articles based on selected category
  const filteredArticles =
    category === "All"
      ? articles
      : articles.filter((article) => article.category === category);

  useEffect(() => {
    refetch();
  }, [category, refetch]);

  const API = import.meta.env.VITE_BACKEND_API_URL;

  // Handle Delete Items
  const handleDeleteItem = async (article) => {
    try {
      let userChoice = window.confirm(
        `Do you want to Delete ${article.title} ?`
      );
      if (userChoice) {
        await axios.delete(`${API}/api/article/${article._id}`);
        refetch();
        toast.success("Article deleted!");
      } else {
        return;
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto rounded-md shadow-md">
          <div className="flex w-fit mb-4 rounded-md bg-primary">
            <div className="p-2">
              <FaFilter className="text-white h-4 w-4" />
            </div>
            <select
              className="bg-primary text-white px-2 py-1 rounded-md outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>All</option>
              <option>Politics</option>
              <option>Weather</option>
              <option>Sports</option>
              <option>Health</option>
              <option>Business</option>
              <option>Education</option>
              <option>Entertainment</option>
              <option>International</option>
            </select>
          </div>

          <table className="table table-zebra">
            {/* head */}
            <thead className="text-center text-white bg-red-800">
              <tr>
                <th>#</th>
                <th>Articles</th>
                <th>Category</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {filteredArticles.length ? (
                filteredArticles.map((article, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td className="min-w-96">
                      <div className="flex items-center gap-3 w-fit">
                        <div className="avatar">
                          <div className="w-28 h-16 rounded">
                            <img
                              src={
                                article?.img ||
                                "https://plus.unsplash.com/premium_photo-1688561384438-bfa9273e2c00?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                              }
                              alt="Failed load"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col justify-start text-start gap-1">
                          <div className="font-bold">{article.title}</div>
                          <div className="flex gap-2">
                            <span className="badge badge-ghost badge-sm">
                              {moment(article?.createdAt).fromNow()}
                            </span>
                            {article.isBreakingNews && (
                              <span className="badge badge-ghost bg-red-600 text-white badge-sm">
                                Breaking News
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="font-semibold">{article.category}</td>
                    <td>
                      <Link to={`/dashboard/update-article/${article._id}`}>
                        <button className="btn btn-sm bg-primary text-white">
                          <FaEdit />
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-ghost btn-sm text-orange-800"
                        onClick={() => handleDeleteItem(article)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No articles found for the selected category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Articles;
