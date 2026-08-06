import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-serif",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_DOMAIN || "https://patnaites.vercel.app";

// Enhanced metadata for SEO
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Patnaites Media | Latest News from Patna, Bihar",
    template: "%s | Patnaites Media",
  },
  description:
    "Patnaites Media offers the latest news from Patna and Bihar, covering local updates, city happenings, and national news since 2016. Stay updated with us!",
  keywords: [
    "patnaites",
    "patnaites media",
    "patna news",
    "patna city",
    "patnaite",
    "news in bihar",
    "patna bihar",
    "bihar news",
    "latest patna news",
  ],
  authors: [{ name: "Patnaites Media" }],
  creator: "Patnaites Media",
  publisher: "Patnaites Media",
  applicationName: "Patnaites Media",
  category: "news",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Patnaites Media | Latest News from Patna, Bihar",
    description:
      "A trusted news portal for Patnaites. Get the latest updates and insights from Patna and Bihar.",
    url: siteUrl,
    siteName: "Patnaites Media",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/apple-touch-icon.png",
        width: 180,
        height: 180,
        alt: "Patnaites Media",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Patnaites2",
    title: "Patnaites Media | Latest News from Patna, Bihar",
    description: "A trusted news portal for Patnaites.",
    images: ["/apple-touch-icon.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "Patnaites Media",
    alternateName: "Patnaites Media",
    url: siteUrl,
    logo: `${siteUrl}/apple-touch-icon.png`,
    foundingDate: "2016",
    sameAs: [
      "https://www.facebook.com/patnaite",
      "https://www.instagram.com/patnaite",
      "https://www.youtube.com/@Patnaites_Official",
      "https://x.com/Patnaites2",
    ],
  };

  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        {/* Google Search Console */}
        <meta
          name="google-site-verification"
          content="0evcXlCiZK4lHB0jxde5Yw-xQYz60Bjug8ivGTo-s70"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {/* Google Analytics Code */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-M9QR7ZG9XE"
        ></Script>
        <Script id="google-analytics">
          {` window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-M9QR7ZG9XE');`}
        </Script>
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
