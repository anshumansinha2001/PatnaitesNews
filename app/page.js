import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import NewsList from "@/components/NewsList";
import ScrollToTop from "@/components/ScrollToTop";

const siteUrl =
  process.env.NEXT_PUBLIC_DOMAIN || "https://patnaites.vercel.app";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Patnaites Media",
  alternateName: "Patnaites Media",
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

export default function Home() {
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
          <NewsList />
        </main>
        <ScrollToTop />
        <Footer />
      </div>
    </>
  );
}
