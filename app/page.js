import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import NewsList from "@/components/NewsList";
import ScrollToTop from "@/components/ScrollToTop";
import { getArticlesLite } from "@/lib/data/articles";

// Regenerate the cached page at most once a minute (ISR) — fast for readers,
// fresh enough for news.
export const revalidate = 60;

const siteUrl =
  process.env.NEXT_PUBLIC_DOMAIN || "https://patnaites.vercel.app";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Patnaites Media",
  url: siteUrl,
  description:
    "Latest news from Patna and Bihar — local updates, city happenings, and national news since 2016.",
  publisher: {
    "@type": "NewsMediaOrganization",
    name: "Patnaites Media",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default async function Home() {
  let initialArticles = [];
  try {
    initialArticles = await getArticlesLite();
  } catch (error) {
    console.error("Home: failed to load initial articles", error);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <Header />
        <main className="flex-1">
          <NewsList initialArticles={initialArticles} />
        </main>
        <ScrollToTop />
        <Footer />
      </div>
    </>
  );
}
