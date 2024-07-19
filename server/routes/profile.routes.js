import express from "express";
import uploadImg from "../middlewares/multer/multer.js";
import convertLogoImgToWebp from "../middlewares/sharp/profileLogoSharp.js";
import Profile from "../models/profile.js";

const router = express.Router();

// GET PATNAITES PROFILE DETAILS
router.get("/profile", async (req, res) => {
  try {
    // Fetch profile details
    const profile = await Profile.findOne({ name: "Patnaites" });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found!" });
    }

    // Format the profile to include full image URL for the logo
    const formattedProfile = {
      ...profile.toObject(),
      logo: profile.logo
        ? `${req.protocol}://${req.headers.host}/${profile.logo}`
        : null,
    };

    res.status(200).json(formattedProfile);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again!" });
    console.error(error.message);
  }
});

// UPDATE PATNAITES PROFILE DETAILS
router.put("/profile", uploadImg, convertLogoImgToWebp, async (req, res) => {
  const { mail, portfolio, fbFollowers, instaFollowers, ytFollowers } =
    req.body;
  let logo;

  if (req.file) {
    logo = `uploads/${req.file.filename}`;
  }

  try {
    // Find the profile with the name "Patnaites"
    const profile = await Profile.findOne({ name: "Patnaites" });

    if (!profile) {
      return res.status(404).json({ message: "This profile is not valid!" });
    }

    // Prepare the update object
    const updateData = {
      mail,
      portfolio,
      fbFollowers,
      instaFollowers,
      ytFollowers,
    };

    if (logo) {
      updateData.logo = logo;
    }

    // Update the profile
    const updatedProfile = await Profile.updateOne(
      { name: "Patnaites" },
      { $set: updateData }
    );

    res
      .status(200)
      .json({ message: "Profile updated successfully!", updatedProfile });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

// Delete LOGO
router.delete("/profile/delete-logo", async (req, res) => {
  try {
    // Find the profile by name and update the logo field to an empty string or null
    const result = await Profile.findOneAndUpdate(
      { name: "Patnaites" },
      { $unset: { logo: "" } },
      { new: true } // Return the updated document
    );

    if (result) {
      res.status(200).json({ message: "Profile logo deleted successfully." });
    } else {
      res
        .status(404)
        .json({ message: "Profile with the specified logo not found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
});

// CREATE PATNAITES PROFILE DETAILS [OPTIONAL]
router.post("/profile", uploadImg, convertLogoImgToWebp, async (req, res) => {
  const { logo, mail, portfolio, fbFollowers, instaFollowers, ytFollowers } =
    req.body;

  logo = req.file ? `uploads/advertisements/${req.file.filename}` : null;
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
    res.status(500).json({ message: error.message });
    console.error(error.message);
  }
});

export default router;
