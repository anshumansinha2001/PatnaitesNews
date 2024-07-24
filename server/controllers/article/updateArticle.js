import Article from "../../models/article.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

export const updateArticle = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  if (req.file) {
    const articleImgLocalPath = req.file.path;
    const imgURL = await uploadOnCloudinary(articleImgLocalPath);
    updatedData.img = imgURL;
  }

  try {
    const result = await Article.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (result) {
      res.status(200).json({ message: "Article has been updated!", result });
    } else {
      res.status(404).json({ message: "Article has not found!" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error updating item", error });
    console.log(error);
  }
};
