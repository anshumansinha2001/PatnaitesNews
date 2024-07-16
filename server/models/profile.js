const { Schema, model } = require("mongoose");

const profileSchema = new Schema(
  {
    name: {
      type: String,
      default: "Patnaites",
    },
    logo: {
      type: String,
      // required: true,
    },
    mail: {
      type: String,
      required: true,
    },
    portfolio: {
      type: String,
      required: true,
    },
    fbFollowers: {
      type: String,
      required: true,
    },
    instaFollowers: {
      type: String,
      required: true,
    },
    ytFollowers: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// create model
const Profile = model("Profile", profileSchema);
module.exports = Profile;
