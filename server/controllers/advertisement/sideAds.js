const SideAds = require("../../models/Advertisement/sideAds");

// GET All Side Ads
const getAllSideAds = async (req, res) => {
  try {
    const Ads = await SideAds.find().sort({ createdAt: -1 });
    res.status(200).json(Ads);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve SideAds" });
    console.error(error.message);
  }
};

// CREATE ADS
const createSideAds = async (req, res) => {
  const { img, link } = req.body;

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
    console.error(error);
  }
};

// UPDATE ADS
const updateSideAds = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

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
    console.error(error);
  }
};

// DELETE ADS
const deleteSideAds = async (req, res) => {
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
    console.error(error);
  }
};

module.exports = { getAllSideAds, createSideAds, updateSideAds, deleteSideAds };
