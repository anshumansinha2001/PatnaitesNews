import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import moment from "moment";
import AdvertisementInBetweenCard from "../components/advertisement/AdvertisementInBetweenCard";

import SocialShare from "../components/SocialShare";
import useFetchBetweenAds from "../hooks/useFetchBetweenAds";
import parse from "html-react-parser";
import defaultArticleImg from "../assets/default_article_img.png";
import { Helmet } from "react-helmet";

const splitContent = (content, wordCount) => {
  // const textContent = content.replace(/(<([^>]+)>)/gi, ""); // Strip HTML tags
  const words = content.split(" ");
  const firstPart = words.slice(0, wordCount).join(" ");
  const secondPart = words.slice(wordCount, wordCount + 150).join(" ");
  const thirdPart = words.slice(wordCount + 150).join(" ");
  return { firstPart, secondPart, thirdPart };
};

const ArticlePage = () => {
  const { articles } = useOutletContext();

  const [betweenAds, refetch] = useFetchBetweenAds();

  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      window.scrollTo(0, 0);
      try {
        const fetchedArticle = articles.find((item) => item._id === id);
        if (!fetchedArticle) {
          throw new Error("Article not found");
        }
        setArticle(fetchedArticle);
        setError(null);
      } catch (error) {
        console.error("Error fetching article:", error);
        setError("Failed to load article. Please try again later.");
      }
    };

    fetchArticle();
    refetch();
  }, [id]);

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!article) {
    return null;
  }

  const { firstPart, secondPart, thirdPart } = splitContent(
    article.content,
    200
  );

  return (
    <div className="max-w-3xl mx-auto p-2">
      <Helmet>
        {/* <!-- Primary Meta Tags --> */}
        <title>{article.title} | Patnaites</title>
        <meta name="title" content={article.title} />
        <meta
          name="description"
          content={article.content.replace(/(<([^>]+)>)/gi, "")}
        />
        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={article.title} />
        <meta
          property="og:description"
          content={article.content.replace(/(<([^>]+)>)/gi, "")}
        />
        <meta property="og:image" content={article?.img || defaultArticleImg} />
        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={window.location.href} />
        <meta property="twitter:title" content={article.title} />
        <meta
          property="twitter:description"
          content={article.content.replace(/(<([^>]+)>)/gi, "")}
        />
        <meta
          property="twitter:image"
          content={article?.img || defaultArticleImg}
        />
      </Helmet>

      <img
        src={article?.img || defaultArticleImg}
        alt="Failed to load image!"
        className={`w-full ${
          !article.img ? "h-32 md:h-48" : "h-[15rem] md:h-[20rem] lg:h-[28rem]"
        } object-cover rounded-lg shadow-md mb-6`}
      />
      <div className="card-actions justify-between mb-4 font-semibold text-sm md:text-lg">
        <span>{moment(article.createdAt ?? "2023-05-25").fromNow()}</span>
        <div className="border rounded-xl px-2">{article.category}</div>
      </div>
      <div className="px-0">
        <h1 className="text-3xl font-bold mb-2 font-serif">{article.title}</h1>
        <div className="flex items-center">
          <span className="font-mono">- {article?.author || "Anonymous"}</span>
        </div>
        <div className="flex justify-end my-4">
          <SocialShare
            title={article.title}
            category={article.category}
            content={article.content.replace(/(<([^>]+)>)/gi, "")}
          />
        </div>
        <div className="text-justify">{parse(firstPart)}</div>
        <div className={`${betweenAds[0] ? "display" : "hidden"} my-4`}>
          <AdvertisementInBetweenCard
            img={betweenAds[0]?.img}
            link={betweenAds[0]?.link}
          />
        </div>
        <div className="text-justify">{parse(secondPart)}</div>
        <div className={`${betweenAds[1] ? "display" : "hidden"} my-4`}>
          <AdvertisementInBetweenCard
            img={betweenAds[1]?.img}
            link={betweenAds[1]?.link}
          />
        </div>
        <div className="text-justify">{parse(thirdPart)}</div>
      </div>
    </div>
  );
};

export default ArticlePage;
