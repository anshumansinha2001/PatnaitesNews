const InBetweenAds = require("../../models/Advertisement/inBetweenAds");

// GET All between Ads
const getAllInBetweenAds = async (req, res) => {
  try {
    // Fetch all between ads sorted by creation date
    const Ads = await InBetweenAds.find().sort({ createdAt: -1 });

    // Adjust ads to include full image URLs
    const formattedAds = Ads.map((ad) => ({
      ...ad.toObject(),
      img: ad.img ? `${req.protocol}://${req.headers.host}/${ad.img}` : null,
    }));

    res.status(200).json(formattedAds);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve InBetweenAds" });
    console.error(error.message);
  }
};

// CREATE ADS
const createInBetweenAds = async (req, res) => {
  const { link } = req.body;
  const img = req.file ? `uploads/advertisements/${req.file.filename}` : null;

  try {
    const adExists = await InBetweenAds.findOne({ img });
    if (adExists) {
      return res.status(409).json({ message: "This Ad is already exists!" });
    }

    const Ad = new InBetweenAds({
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
const updateInBetweenAds = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  if (req.file) {
    updatedData.img = `uploads/advertisements/${req.file.filename}`;
  }

  try {
    const result = await InBetweenAds.findByIdAndUpdate(id, updatedData, {
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
const deleteInBetweenAds = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await InBetweenAds.findByIdAndDelete(id);

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

module.exports = {
  getAllInBetweenAds,
  createInBetweenAds,
  updateInBetweenAds,
  deleteInBetweenAds,
};
