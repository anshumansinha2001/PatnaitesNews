import React from "react";
import { useParams } from "react-router-dom";
import PostForm from "../../../components/admin/Post Form/PostForm";
import useFetchArticle from "../../../hooks/useFetchArticle";

const UpdateArticle = () => {
  const [articles, refetch, loading] = useFetchArticle();

  const { id } = useParams(); // Destructure the id from useParams
  const article = articles.find((article) => article._id === id); // Find the article by id

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-3xl md:text-4xl font-semibold my-4 underline underline-offset-4">
        Update This Article
      </h2>
      <PostForm post={article} />
    </div>
  );
};

export default UpdateArticle;
