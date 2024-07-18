import React from "react";
import { FaShareSquare } from "react-icons/fa";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const SocialShare = ({ id, title, category }) => {
  const apiUrl = import.meta.env.VITE_FRONTEND_API_URL;
  const shareUrl = `${apiUrl}/${category.toLowerCase()}/article/${id}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Check out this article on ${category}`,
          text: `${title}`,
          url: shareUrl,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback action if Web Share API is not supported
      alert("Please use a browser that supports sharing.");
      console.log("Web Share API not supported in this browser");
    }
  };

  return (
    <div className="flex space-x-4">
      <TwitterShareButton url={shareUrl} title={title} hashtags={[category]}>
        <TwitterIcon size={35} className="rounded-full" />
      </TwitterShareButton>

      <WhatsappShareButton url={shareUrl} title={`*${title}*`} separator=" :- ">
        <WhatsappIcon size={35} className="rounded-full" />
      </WhatsappShareButton>

      <FacebookShareButton
        url={shareUrl}
        hashtag={title.split(0, 10).join("") + " #" + category}
      >
        <FacebookIcon size={35} className="rounded-full" />
      </FacebookShareButton>

      {/* Share button to copy link */}
      <button
        onClick={handleShare}
        className="p-2 rounded-full bg-pink-500 text-white"
      >
        <FaShareSquare />
      </button>
    </div>
  );
};

export default SocialShare;
