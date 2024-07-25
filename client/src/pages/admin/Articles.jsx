import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaFilter, FaTrash } from "react-icons/fa";
import moment from "moment";
import useFetchArticle from "../../hooks/useFetchArticle";
import Spinner from "../../components/Loading/Spinner";
import axios from "axios";
import { toast } from "react-toastify";
import defaultArticleImg from "../../assets/default_article_img.png";

const Articles = () => {
  const [articles, refetch, loading] = useFetchArticle();
  const [category, setCategory] = useState("All");

  // Filter articles based on selected category
  // useMemo means it only recalculates the result when the dependencies change, rather than on every render
  const filteredArticles = useMemo(
    () =>
      category === "All"
        ? articles
        : articles.filter((article) => article.category === category),
    [category, articles]
  );

  // Handle Delete Items
  const handleDeleteItem = async (article) => {
    try {
      let userChoice = window.confirm(
        `Do you want to Delete ${article.title} ?`
      );
      if (userChoice) {
        await axios.delete(`/api/article/${article._id}`);
        refetch();
        toast.info("Article deleted!");
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
              <option>Cities</option>
              <option>Business</option>
              <option>Education</option>
              <option>Technology</option>
              <option>Lifestyle</option>
              <option>Travel</option>
              <option>Health</option>
              <option>Weather</option>
              <option>Entertainment</option>
              <option>Sports</option>
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

            {/* body */}
            <tbody className="text-center">
              {filteredArticles.length ? (
                filteredArticles.map((article, index) => (
                  <tr key={article._id}>
                    <th>{index + 1}</th>
                    <td className="min-w-96">
                      <div className="flex items-center gap-3 w-fit">
                        <div className="avatar">
                          <div className="w-28 h-16 rounded">
                            <img
                              src={article?.img || defaultArticleImg}
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
                    404! No articles found.
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
