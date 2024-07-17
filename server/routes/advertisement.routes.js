const express = require("express");
const uploadImg = require("../middlewares/multer/multer");
const convertAdvertisementToWebp = require("../middlewares/sharp/advertisementSharp");

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
router.post("/side-ads", uploadImg, convertAdvertisementToWebp, createSideAds);
router.put(
  "/side-ads/:id",
  uploadImg,
  convertAdvertisementToWebp,
  updateSideAds
);
router.delete("/side-ads/:id", deleteSideAds);

// FOR BETWEEN ADS
router.get("/between-ads", getAllInBetweenAds);
router.post(
  "/between-ads",
  uploadImg,
  convertAdvertisementToWebp,
  createInBetweenAds
);
router.put(
  "/between-ads/:id",
  uploadImg,
  convertAdvertisementToWebp,
  updateInBetweenAds
);
router.delete("/between-ads/:id", deleteInBetweenAds);

// FOR BOTTOM ADS
router.get("/bottom-ads", getAllBottomAds);
router.post(
  "/bottom-ads",
  uploadImg,
  convertAdvertisementToWebp,
  createBottomAds
);
router.put(
  "/bottom-ads/:id",
  uploadImg,
  convertAdvertisementToWebp,
  updateBottomAds
);
router.delete("/bottom-ads/:id", deleteBottomAds);

module.exports = router;
