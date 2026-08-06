import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import SocialShare from "@/components/ArticleComponents/SocialShare";
import PageNotFound from "@/app/not-found";
import ReportBtn from "@/components/ArticleComponents/ReportBtn";
import AdsBetweenCard from "@/components/AdsComponents/AdsBetweenCard";
import AdsBottomCard from "@/components/AdsComponents/AdsBottomCard";
import ReadingProgress from "@/components/ArticleComponents/ReadingProgress";
import RelatedArticles from "@/components/ArticleComponents/RelatedArticles";
import ScrollToTop from "@/components/ScrollToTop";

const Page = async ({ params }) => {
  let article = null;

  // Fetch the article from the API
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/article`,
      {
        params: { slug: params.slug },
      },
    );

    article = response.data.article;

    if (!article) {
      return <PageNotFound />;
    }
  } catch (error) {
    console.error("Error fetching article:", error);
    return (
      <p className="text-center text-3xl flex justify-center items-center h-screen">
        There was a problem fetching the article. Please try again later.
      </p>
    );
  }

  //  Fetch betweend ads from API
  //  Use an absolute URL for fetching ads to avoid any issues during SSR.
  let betweensAds = null;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/between-ad`,
    );

    betweensAds = response.data.ads;
  } catch (error) {
    console.log(error);
  }

  const shareUrl = `${
    process.env.NEXT_PUBLIC_DOMAIN
  }/${article.category.toLowerCase()}/${article.slug}`;

  const formatDate = moment(article.updatedAt).format("MMMM Do YYYY");

  const plainText = article.description.replace(/(<([^>]+)>)/gi, " ");
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const readMinutes = Math.max(1, Math.round(wordCount / 200));
  const categorySlug = article.category.toLowerCase();
  const categoryLabel =
    article.category.charAt(0).toUpperCase() + article.category.slice(1);

  // Split the description into three parts
  const splitDescription = (description, wordCount) => {
    const words = description.split(" ");
    const firstPart = words.slice(0, wordCount).join(" ");
    const secondPart = words.slice(wordCount, wordCount + 200).join(" ");
    const thirdPart = words.slice(wordCount + 150).join(" ");
    return { firstPart, secondPart, thirdPart };
  };

  const { firstPart, secondPart, thirdPart } = splitDescription(
    article.description,
    250,
  );

  // Schema Markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    image: article.image,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: "Patnaites Media",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/apple-touch-icon.png`,
      },
    },
    datePublished: article.createdAt,
    dateModified: article.updatedAt,
    articleSection: article.category,
    description: article.description.replace(/(<([^>]+)>)/gi, ""),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${
        process.env.NEXT_PUBLIC_DOMAIN
      }/${article.category.toLowerCase()}/${article.slug}`,
    },
  };

  // Breadcrumb structured data (technical SEO)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: process.env.NEXT_PUBLIC_DOMAIN,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryLabel,
        item: `${process.env.NEXT_PUBLIC_DOMAIN}/${categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ReadingProgress />
      <div className="flex min-h-screen flex-col">
        <Navbar right={<ReportBtn slug={article.slug} />} />

        <main className="flex-1">
          <article>
            {/* Article header */}
            <header className="mx-auto max-w-3xl px-5 pt-8 text-center md:pt-12">
              {/* Breadcrumb */}
              <nav
                aria-label="Breadcrumb"
                className="mb-6 flex items-center justify-center gap-1.5 text-xs text-muted"
              >
                <Link href="/" className="hover:text-accent">
                  Home
                </Link>
                <span aria-hidden>/</span>
                <Link href={`/${categorySlug}`} className="hover:text-accent">
                  {categoryLabel}
                </Link>
              </nav>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                {article.category}
              </span>
              <h1 className="mx-auto mt-4 max-w-2xl font-serif text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl">
                {article.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-muted">
                <span className="font-medium text-ink">{article.author}</span>
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <time>{formatDate}</time>
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <span>{readMinutes} min read</span>
              </div>
            </header>

            {/* Hero image */}
            <div className="mx-auto mt-8 max-w-4xl px-5 md:mt-10">
              <Image
                className="h-auto w-full rounded-2xl object-cover shadow-sm"
                src={article.image}
                alt={article.title || "Article image"}
                width={1280}
                height={720}
                loading="eager"
                quality={100}
              />
            </div>

            {/* Body */}
            <div className="mx-auto max-w-3xl px-5">
              <div className="my-6 flex items-center justify-between border-b border-gray-200 pb-6">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
                  {article.category}
                </span>
                <SocialShare url={shareUrl} />
              </div>

              <div className="article-body">
                <div>{parse(firstPart)}</div>
                {betweensAds?.[0] && (
                  <AdsBetweenCard
                    image={betweensAds[0].image}
                    link={betweensAds[0].link}
                  />
                )}
                <div>{parse(secondPart)}</div>
                {betweensAds?.[1] && (
                  <AdsBetweenCard
                    image={betweensAds[1].image}
                    link={betweensAds[1].link}
                  />
                )}
                <div>{parse(thirdPart)}</div>
              </div>

              {/* Share again + back */}
              <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent"
                >
                  <span aria-hidden>←</span> Back to all news
                </Link>
                <SocialShare url={shareUrl} />
              </div>
            </div>
          </article>

          <RelatedArticles
            category={article.category}
            currentSlug={article.slug}
          />

          <div className="mx-auto mt-12 max-w-content px-5">
            <AdsBottomCard />
          </div>
        </main>

        <ScrollToTop />
        <Footer />
      </div>
    </>
  );
};

// Generate metadata for the found article
export async function generateMetadata({ params }) {
  let article;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/article`,
      {
        params: { slug: params.slug },
      },
    );
    article = response.data.article;
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }

  if (!article) {
    return {
      title: "Post not found",
      description: "The article you are looking for does not exist.",
    };
  }

  // Construct metadata for the found article
  const metaTitle = article.title || "Patnaites Media";
  const metaDescription =
    article.description
      .replace(/(<([^>]+)>)/gi, "")
      .slice(0, 155)
      .trim()
      .concat("…") || "Stay updated with the latest news and events in Patna.";
  const imageUrl = article.image || "/apple-touch-icon.png";
  const canonicalUrl = `${
    process.env.NEXT_PUBLIC_DOMAIN
  }/${article.category.toLowerCase()}/${article.slug}`;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: metaTitle,
      description: metaDescription,
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      section: article.category,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default Page;
