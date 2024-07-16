const express = require("express");
const uploadAdvertisementImg = require("../middlewares/multer/advertisementMulter");

const router = express.Router();

const {
  getAllSideAds,
  createSideAds,
  updateSideAds,
  deleteSideAds,
} = require("../controllers/advertisement/sideAds");

const {
  getAllInBetweenAds,
  createInBetweenAds,
  updateInBetweenAds,
  deleteInBetweenAds,
} = require("../controllers/advertisement/inBetweenAds");

const {
  createBottomAds,
  getAllBottomAds,
  updateBottomAds,
  deleteBottomAds,
} = require("../controllers/advertisement/bottomAds");

// FOR SIDE ADS
router.get("/side-ads", getAllSideAds);
router.post("/side-ads", uploadAdvertisementImg, createSideAds);
router.put("/side-ads/:id", uploadAdvertisementImg, updateSideAds);
router.delete("/side-ads/:id", deleteSideAds);

// FOR BETWEEN ADS
router.get("/between-ads", getAllInBetweenAds);
router.post("/between-ads", uploadAdvertisementImg, createInBetweenAds);
router.put("/between-ads/:id", uploadAdvertisementImg, updateInBetweenAds);
router.delete("/between-ads/:id", deleteInBetweenAds);

// FOR BOTTOM ADS
router.get("/bottom-ads", getAllBottomAds);
router.post("/bottom-ads", uploadAdvertisementImg, createBottomAds);
router.put("/bottom-ads/:id", uploadAdvertisementImg, updateBottomAds);
router.delete("/bottom-ads/:id", deleteBottomAds);

module.exports = router;
