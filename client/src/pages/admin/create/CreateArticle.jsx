import React from "react";
import PostForm from "../../../components/admin/Post Form/PostForm";

const CreateArticle = () => {
  return (
    <div className="w-full md:w-[870px] px-4 mx-auto rounded-md shadow-md p-2">
      <h2 className="text-3xl md:text-4xl font-semibold my-4 underline underline-offset-4">
        Create Article
      </h2>

      <PostForm />
    </div>
  );
};

export default CreateArticle;
