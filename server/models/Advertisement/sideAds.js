const { Schema, model } = require("mongoose");

const sideAdsSchema = new Schema(
  {
    img: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// create model
const SideAds = model("SideAds", sideAdsSchema);
module.exports = SideAds;
