import { Schema, model } from "mongoose";

const bottomAdsSchema = new Schema(
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
const BottomAds = model("BottomAds", bottomAdsSchema);
export default BottomAds;
