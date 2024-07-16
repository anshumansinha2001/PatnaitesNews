import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const ArticleCard = ({
  id,
  img,
  title = "untitled",
  isBreakingNews,
  content,
  date,
  category,
}) => {
  return (
    <div className="card mb-1.5 md:mb-0 bg-base-100 w-full sm:w-44 md:w-52 lg:w-64 shadow-xl cursor-pointer border border-[#66666645]">
      <Link to={`/${category.toLowerCase()}/article/${id}`}>
        <figure className="relative">
          <img
            src={
              img ||
              "https://plus.unsplash.com/premium_photo-1688561384438-bfa9273e2c00?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="Failed to load image!"
            className="w-full h-[8rem] md:h-[10rem] object-cover hover:scale-125 transition-transform duration-300 ease-in-out rounded-t-xl"
          />
          {isBreakingNews ? (
            <div className="bg-red-600 text-white rounded text-[9px] md:text-xs p-1 absolute bottom-0 right-0">
              Breaking News!
            </div>
          ) : null}
        </figure>
        <div className="card-body px-1 py-2 md:p-2 relative">
          <h2 className="text-sm font-semibold md:text-lg leading-none">
            {title}
          </h2>
          <div className="text-xs">
            {parse(
              content.slice(0, 52).trim() + (content.length > 52 ? "..." : ""),
              {
                replace: (domNode) => {
                  if (domNode.name === "p") {
                    return (
                      <span>{domNode.children.map((child) => child.data)}</span>
                    );
                  }
                },
              }
            )}
          </div>

          <div className="card-actions justify-between">
            <span className="text-xs">
              {moment(date ?? "2023-05-25").fromNow()}
            </span>
            <div className="badge badge-outline text-xs">{category}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
