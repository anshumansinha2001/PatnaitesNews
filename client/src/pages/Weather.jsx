import React, { useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import { useOutletContext } from "react-router-dom";

const Weather = () => {
  const { articles } = useOutletContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {/* CENTER */}
      <p className="text-center font-extrabold text-lg md:text-2xl">
        Weather News
      </p>
      <div className="flex justify-around flex-wrap gap-1 md:gap-4 lg:gap-6 px-0 md:px-3  py-2 md:py-4">
        {articles.map((article, index) =>
          article.category === "Weather" ? (
            <ArticleCard
              key={index}
              id={article._id}
              img={article.img}
              title={article.title}
              isBreakingNews={article.isBreakingNews}
              content={article.content}
              category={article.category}
            />
          ) : null
        )}
      </div>
    </>
  );
};

export default Weather;
