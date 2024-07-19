import express from "express";
import uploadImg from "../middlewares/multer/multer.js";
import convertAdvertisementToWebp from "../middlewares/sharp/advertisementSharp.js";

import {
  getAllSideAds,
  createSideAds,
  updateSideAds,
  deleteSideAds,
} from "../controllers/advertisement/sideAds.js";

import {
  getAllInBetweenAds,
  createInBetweenAds,
  updateInBetweenAds,
  deleteInBetweenAds,
} from "../controllers/advertisement/inBetweenAds.js";

import {
  createBottomAds,
  getAllBottomAds,
  updateBottomAds,
  deleteBottomAds,
} from "../controllers/advertisement/bottomAds.js";

const router = express.Router();

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

export default router;
