const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

// Ensure the uploads/articles directory exists
const rootDir = path.join(__dirname, "../../");
const uploadDir = path.join(rootDir, "./uploads", "advertisements");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware to process the image and save as webp format
const convertAdvertisementToWebp = async (req, res, next) => {
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
      .webp({ quality: 60 }) // Adjust quality as needed (0 - 100)
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

module.exports = convertAdvertisementToWebp;
