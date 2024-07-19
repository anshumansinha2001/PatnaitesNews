import { Schema, model } from "mongoose";

const inBetweenAdsSchema = new Schema(
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
const InBetweenAds = model("InBetweenAds", inBetweenAdsSchema);
export default InBetweenAds;
