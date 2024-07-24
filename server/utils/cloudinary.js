import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload an image
export const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    // Upload the file on Cloudinary, specifying the folder
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "PatnaitesNews", // Uploads files to the specified folder
    });

    // console.log("file is uploaded on cloudinary ", response.url);

    // Remove the locally saved temporary file
    fs.unlinkSync(localFilePath);

    return response.url;
  } catch (error) {
    // Log the error
    console.error("Error uploading to Cloudinary:", error);

    // Remove the locally saved temporary file if it exists
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return { error: error.message || "An error occurred during the upload" };
  }
};
