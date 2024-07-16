const express = require("express");
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
router.post("/side-ads", createSideAds);
router.put("/side-ads/:id", updateSideAds);
router.delete("/side-ads/:id", deleteSideAds);

// FOR BETWEEN ADS
router.get("/between-ads", getAllInBetweenAds);
router.post("/between-ads", createInBetweenAds);
router.put("/between-ads/:id", updateInBetweenAds);
router.delete("/between-ads/:id", deleteInBetweenAds);

// FOR BOTTOM ADS
router.get("/bottom-ads", getAllBottomAds);
router.post("/bottom-ads", createBottomAds);
router.put("/bottom-ads/:id", updateBottomAds);
router.delete("/bottom-ads/:id", deleteBottomAds);

module.exports = router;
