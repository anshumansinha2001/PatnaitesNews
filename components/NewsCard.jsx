import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const decodeEntities = (str = "") =>
  str
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "…")
    .replace(/&(?:ldquo|rdquo);/g, "”")
    .replace(/&(?:lsquo|rsquo);/g, "’")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&amp;/g, "&");

const stripHtml = (html = "") =>
  decodeEntities(html.replace(/(<([^>]+)>)/gi, "")).replace(/\s+/g, " ").trim();

const readingTime = (html = "") => {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

const NewsCard = ({
  slug,
  image,
  title,
  description,
  category,
  updatedAt,
  featured = false,
}) => {
  const href = `/${category.toLowerCase()}/${slug}`;
  const cleanDesc = stripHtml(description);
  const mins = readingTime(description);

  if (featured) {
    return (
      <article className="group grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <Link
          href={href}
          className="relative block aspect-[16/10] overflow-hidden rounded-2xl bg-gray-100"
        >
          <Image
            src={image}
            alt={title || "Article image"}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {category}
          </span>
        </Link>

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-accent">
            <span>Featured</span>
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <time className="text-muted normal-case">
              {moment(updatedAt).fromNow()}
            </time>
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <span className="text-muted normal-case">{mins} min read</span>
          </div>
          <Link href={href}>
            <h2 className="mt-3 font-serif text-2xl font-bold leading-tight tracking-tight text-ink transition-colors group-hover:text-accent sm:text-3xl md:text-4xl">
              {title}
            </h2>
          </Link>
          <p className="mt-4 line-clamp-3 text-base text-muted">{cleanDesc}</p>
          <Link
            href={href}
            className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent"
          >
            Read full story
            <span aria-hidden>→</span>
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col">
      <Link
        href={href}
        className="relative block aspect-[16/10] overflow-hidden rounded-xl bg-gray-100"
      >
        <Image
          src={image}
          alt={title || "Article image"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
          {category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-center gap-2 text-xs font-medium text-muted">
          <time>{moment(updatedAt).fromNow()}</time>
          <span className="h-1 w-1 rounded-full bg-gray-300" />
          <span>{mins} min read</span>
        </div>
        <Link href={href}>
          <h3 className="mt-1.5 line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent">
            {title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-3 text-sm text-muted">{cleanDesc}</p>
        <Link
          href={href}
          className="mt-auto pt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-accent transition-transform group-hover:gap-2.5"
        >
          Read more
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
};

export default NewsCard;
