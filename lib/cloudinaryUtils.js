import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

// Upload an image (a Web `File`/`Blob` from formData) straight to Cloudinary
// from an in-memory buffer using an upload stream. No temp files are written,
// so this works on read-only serverless filesystems (Vercel).
export async function uploadImageToCloudinary(image, folder) {
  if (!image || typeof image.arrayBuffer !== "function") {
    throw new Error("A valid image file is required.");
  }

  const buffer = Buffer.from(await image.arrayBuffer());

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        format: "webp", // Convert to WebP
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
}

// Delete a Cloudinary image given its stored secure URL.
export async function deleteCloudinaryImage(imageUrl, folder) {
  if (!imageUrl) return;
  const publicId = imageUrl.split("/").pop().split(".")[0]; // Extract public ID
  await cloudinary.uploader.destroy(`${folder}/${publicId}`);
}

// Standard JSON error response helper.
export function handleError(message, status = 500) {
  return NextResponse.json(
    {
      success: false,
      error: true,
      message,
    },
    { status }
  );
}
