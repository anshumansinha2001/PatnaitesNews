// Custom next/image loader.
// For Cloudinary-hosted images it injects on-the-fly transformations so the
// browser downloads a right-sized, auto-format (AVIF/WebP), auto-quality image
// straight from Cloudinary's CDN — fast, and it doesn't consume Vercel's image
// optimization quota. Non-Cloudinary sources (local icons) are returned as-is.
export default function cloudinaryLoader({ src, width, quality }) {
  if (
    typeof src !== "string" ||
    !src.includes("res.cloudinary.com") ||
    !src.includes("/upload/")
  ) {
    return src;
  }

  const transforms = [
    "f_auto",
    quality ? `q_${quality}` : "q_auto",
    "c_limit", // never upscale beyond the original
    `w_${width}`,
  ].join(",");

  return src.replace("/upload/", `/upload/${transforms}/`);
}
