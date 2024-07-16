const BottomAds = require("../../models/Advertisement/bottomAds");

// GET All bottom Ads
const getAllBottomAds = async (req, res) => {
  try {
    // Fetch all bottom ads sorted by creation date
    const Ads = await BottomAds.find().sort({ createdAt: -1 });

    // Adjust ads to include full image URLs
    const formattedAds = Ads.map((ad) => ({
      ...ad.toObject(),
      img: ad.img ? `${req.protocol}://${req.headers.host}/${ad.img}` : null,
    }));

    res.status(200).json(formattedAds);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve BottomAds" });
    console.error(error.message);
  }
};

// CREATE ADS
const createBottomAds = async (req, res) => {
  const { link } = req.body;
  const img = req.file ? `uploads/advertisements/${req.file.filename}` : null;

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
  const id = req.params.id;
  const updatedData = req.body;

  if (req.file) {
    updatedData.img = `uploads/advertisements/${req.file.filename}`;
  }

  try {
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
