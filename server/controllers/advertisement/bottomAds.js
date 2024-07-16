const BottomAds = require("../../models/Advertisement/bottomAds");

// GET All bottom Ads
const getAllBottomAds = async (req, res) => {
  try {
    const Ads = await BottomAds.find().sort({ createdAt: -1 });
    res.status(200).json(Ads);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve BottomAds" });
    console.error(error.message);
  }
};

// CREATE ADS
const createBottomAds = async (req, res) => {
  const { img, link } = req.body;

  try {
    const adExists = await BottomAds.findOne({ img });
    if (adExists) {
      return res.status(409).json({ message: "This Ad is already exists!" });
    }

    const Ad = new BottomAds({
      img,
      link,
    });

    const savedAd = await Ad.save();
    res.status(201).json(savedAd);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

// UPDATE ADS
const updateBottomAds = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await BottomAds.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (result) {
      res.status(200).json({ message: "Ad is updated!", result });
    } else {
      res.status(404).json({ message: "Ad not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating this Ad!" });
    console.error(error);
  }
};

// DELETE ADS
const deleteBottomAds = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await BottomAds.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ message: "Ad is deleted!" });
    } else {
      res.status(404).json({ message: "Ad not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting this Ad!" });
    console.error(error);
  }
};

module.exports = {
  getAllBottomAds,
  createBottomAds,
  updateBottomAds,
  deleteBottomAds,
};
