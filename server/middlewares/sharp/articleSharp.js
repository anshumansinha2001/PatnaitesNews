import path from "path";
import sharp from "sharp";
import fs from "fs";
import { fileURLToPath } from "url";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the uploads/articles directory exists
const rootDir = path.join(__dirname, "../../");
const uploadDir = path.join(rootDir, "./uploads", "articles");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware to process the image and save as webp format
const convertArticleToWebp = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const { buffer, originalname } = req.file;
  const filename =
    path.parse(originalname).name.replace(" ", "_") +
    "-" +
    Date.now() +
    ".webp";
  const filepath = path.join(uploadDir, filename);

  try {
    // Convert the image to webp format and save it
    await sharp(buffer)
      .webp({ quality: 100 }) // Adjust quality as needed (0 - 100)
      .toFile(filepath);

    // Set the file information in the request object
    req.file.filename = filename;
    req.file.path = filepath;
    next();
  } catch (error) {
    console.error("Error processing image:", error);
    res
      .status(500)
      .send({ message: "Error processing image", error: error.message });
  }
};

export default convertArticleToWebp;
