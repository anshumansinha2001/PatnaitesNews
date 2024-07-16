const express = require("express");
const router = express.Router();

const Visitor = require("../models/visitor");

router.get("/count/visitors", async (req, res) => {
  let visitors = await Visitor.findOne();
  if (!visitors) {
    visitors = new Visitor({ count: 1 });
  } else {
    visitors.count += 1;
  }
  await visitors.save();
  res.status(200).json({ count: visitors.count });
});

router.get("/show/visitors", async (req, res) => {
  let visitors = await Visitor.findOne();
  if (!visitors) {
    visitors = new Visitor({ count: 0 });
  }
  res.status(200).json({ count: visitors.count });
});

module.exports = router;
