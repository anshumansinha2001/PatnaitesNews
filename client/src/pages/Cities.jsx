import React, { useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import { useOutletContext } from "react-router-dom";

const Cities = () => {
  const { articles } = useOutletContext();

  const filteredArticles = articles.filter(
    (article) => article.category === "Cities"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!filteredArticles.length) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <h1 className="text-warning font-mono">
          Articles have not published yet!
        </h1>
      </div>
    );
  }

  return (
    <>
      {/* CENTER */}
      <p className="text-center font-extrabold text-lg md:text-2xl tracking-widest uppercase ">
        Cities
      </p>
      <div className="flex justify-around flex-wrap gap-1 md:gap-4 lg:gap-6 px-0 md:px-3  py-2 md:py-4">
        {filteredArticles &&
          filteredArticles.map((article) => (
            <ArticleCard
              key={article._id}
              id={article._id}
              img={article.img}
              title={article.title}
              isBreakingNews={article.isBreakingNews}
              content={article.content}
              category={article.category}
            />
          ))}
      </div>
    </>
  );
};

export default Cities;
