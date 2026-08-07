/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve optimized, right-sized images straight from Cloudinary's CDN.
    loader: "custom",
    loaderFile: "./lib/cloudinaryLoader.js",
  },

  // Keep the response fast and lean.
  compress: true,
  poweredByHeader: false,

  async rewrites() {
    return [
      {
        source: "/sitemap.xml", // When someone visits /sitemap.xml
        destination: "/sitemap", // Serve the sitemap from app/sitemap/route.js
      },
    ];
  },
};

export default nextConfig;
