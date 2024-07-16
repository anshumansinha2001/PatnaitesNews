import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import moment from "moment";
import AdvertisementInBetweenCard from "../components/advertisement/AdvertisementInBetweenCard";
import { Helmet } from "react-helmet";
import SocialShare from "../components/SocialShare";
import useFetchBetweenAds from "../hooks/useFetchBetweenAds";
import parse from "html-react-parser";

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
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      window.scrollTo(0, 0);
      try {
        const fetchedArticle = articles.find((item) => item._id === id);
        if (!fetchedArticle) {
          throw new Error("Article not found");
        }
        setArticle(fetchedArticle);
        setShareUrl(window.location.href);
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
        <title>
          {article.title ? `${article.title} | Patnaites` : "Patnaites News"}
        </title>
        <meta
          name="description"
          content={
            article.content
              ? parse(article.content.slice(0, 150))
              : "Get the latest news, updates, and articles from around the world."
          }
        />
        <meta
          name="keywords"
          content="News, Breaking News, Latest News, Sports, Business, Politics, Education, Entertainment"
        />
        {/* Open Graph Tags for Facebook and WhatsApp */}
        <meta property="og:title" content={article.title || "NewsPortal"} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={shareUrl} />
        <meta
          property="og:image"
          content={
            article?.img ||
            "https://plus.unsplash.com/premium_photo-1688561384438-bfa9273e2c00?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
        <meta
          property="og:description"
          content={parse(article.content.slice(0, 150))}
        />
        <meta property="og:site_name" content="Patnaites" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title || "NewsPortal"} />
        <meta
          name="twitter:description"
          content={parse(article.content.slice(0, 150))}
        />
        <meta
          name="twitter:image"
          content={
            article?.img ||
            "https://plus.unsplash.com/premium_photo-1688561384438-bfa9273e2c00?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
      </Helmet>

      <img
        src={
          article?.img ||
          "https://plus.unsplash.com/premium_photo-1688561384438-bfa9273e2c00?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
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
            id={article._id}
            title={article.title}
            category={article.category}
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
