import SideAds from "../../models/Advertisement/sideAds.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

// GET All Side Ads
export const getAllSideAds = async (req, res) => {
  try {
    // Fetch all side ads sorted by creation date
    const Ads = await SideAds.find().sort({ createdAt: -1 });

    res.status(200).json(Ads);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve SideAds" });
    console.error(error.message);
  }
};

// CREATE ADS
export const createSideAds = async (req, res) => {
  const { link } = req.body;

  const AdvertisementImgLocalPath = req.file?.path;
  const img = await uploadOnCloudinary(AdvertisementImgLocalPath);

  try {
    const adExists = await SideAds.findOne({ img });
    if (adExists) {
      return res.status(409).json({ message: "This Ad is already exists!" });
    }

    const Ad = new SideAds({
      img,
      link,
    });

    const savedAd = await Ad.save();
    res.status(201).json(savedAd);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

// UPDATE ADS
export const updateSideAds = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  if (req.file) {
    const AdvertisementImgLocalPath = req.file.path;
    const imgURL = await uploadOnCloudinary(AdvertisementImgLocalPath);
    updatedData.img = imgURL;
  }

  try {
    const result = await SideAds.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (result) {
      res.status(200).json({ message: "Ad is updated!", result });
    } else {
      res.status(404).json({ message: "Ad not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating this Ad!" });
    console.log(error);
  }
};

// DELETE ADS
export const deleteSideAds = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await SideAds.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ message: "Ad is deleted!" });
    } else {
      res.status(404).json({ message: "Ad not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting this Ad!" });
    console.log(error);
  }
};
