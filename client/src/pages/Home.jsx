import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";

const Home = () => {
  const { articles } = useOutletContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* CENTER */}
      <p className="text-center font-extrabold text-lg md:text-2xl tracking-widest uppercase ">
        Latest News
      </p>
      <div className="flex justify-around flex-wrap gap-1 md:gap-4 lg:gap-6 px-0 md:px-3 py-2 md:py-4">
        {articles.map((article) => (
          <ArticleCard
            key={article._id}
            id={article._id}
            img={article.img}
            title={article.title}
            isBreakingNews={article.isBreakingNews}
            content={article.content}
            date={article.createdAt}
            category={article.category}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
