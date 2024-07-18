import React from "react";
import { FaShareSquare } from "react-icons/fa";
import {
  FacebookIcon,
  FacebookShareButton,
  XIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from "react-share";

const SocialShare = ({ title, category, content }) => {
  const shareUrl = window.location.href;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: content,
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
        <XIcon size={35} className="rounded-full" />
      </TwitterShareButton>

      <LinkedinShareButton
        url={shareUrl}
        title={title}
        summary={content}
        source="Patnaites"
      >
        <LinkedinIcon size={35} className="rounded-full" />
      </LinkedinShareButton>

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
