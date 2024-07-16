const express = require("express");
const router = express.Router();

const Profile = require("../models/profile");

// GET PATNAITES PROFILE DETAILS
router.get("/profile", async (req, res) => {
  try {
    const profile = await Profile.find();
    res.status(200).json(profile);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again!" });
    console.error(error.message);
  }
});

// UPDATE PATNAITES PROFILE DETAILS
router.put("/profile", async (req, res) => {
  const { logo, mail, portfolio, fbFollowers, instaFollowers, ytFollowers } =
    req.body;
  try {
    // Find the profile with the given mail
    const profile = await Profile.findOne({ name: "Patnaites" });

    if (!profile) {
      return res.status(404).json({ message: "This profile is not valid!" });
    }

    // Update the profile
    const updatedProfile = await Profile.updateOne(
      { name: "Patnaites" },
      {
        $set: {
          mail,
          logo,
          mail,
          portfolio,
          fbFollowers,
          instaFollowers,
          ytFollowers,
        },
      }
    );

    res
      .status(200)
      .json({ message: "Profile updated successfully!", updatedProfile });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again!" });
    console.error(error.message);
  }
});

// CREATE PATNAITES PROFILE DETAILS [OPTIONAL]
router.post("/profile", async (req, res) => {
  const { logo, mail, portfolio, fbFollowers, instaFollowers, ytFollowers } =
    req.body;
  try {
    const profileExists = await Profile.findOne({ name: "Patnaites" });

    if (profileExists) {
      return res
        .status(409)
        .json({ message: "This profile already exists in the database." });
    }

    const newProfile = new Profile({
      logo,
      mail,
      portfolio,
      fbFollowers,
      instaFollowers,
      ytFollowers,
    });

    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
    console.error(error.message);
  }
});

module.exports = router;
