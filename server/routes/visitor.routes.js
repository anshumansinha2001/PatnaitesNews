import express from "express";
import Visitor from "../models/visitor.js";

const router = express.Router();

// Route to increment visitor count
router.get("/visitors/increment", async (req, res) => {
  try {
    let visitors = await Visitor.findOne();
    if (!visitors) {
      visitors = new Visitor({ count: 1 });
    } else {
      visitors.count += 1;
    }
    await visitors.save();
    res.status(200).json({ count: visitors.count });
  } catch (error) {
    console.error("Error incrementing visitor count:", error);
    res.status(500).json({ error: "Failed to increment visitor count" });
  }
});

// Route to show current visitor count
router.get("/visitors", async (req, res) => {
  try {
    let visitors = await Visitor.findOne();
    if (!visitors) {
      visitors = new Visitor({ count: 0 });
    }
    res.status(200).json({ count: visitors.count });
  } catch (error) {
    console.error("Error fetching visitor count:", error);
    res.status(500).json({ error: "Failed to fetch visitor count" });
  }
});

export default router;
