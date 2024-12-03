const express = require("express");
const upload = require("../config/multer"); // Import multer configuration
const File = require("../models/File");
const User = require("../models/User");

const router = express.Router();

// File upload route
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log("files");
    const userId = req.body.userId; // Get user ID from request body or session
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Save file details to the database
    const newFile = new File({
      user: user._id,
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
    });

    await newFile.save();
    res
      .status(200)
      .json({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    res.status(500).json({ error: "Error uploading file" });
  }
});

router.get("/:userId/list", async (req, res) => {
  try {
    const files = await File.find({ user: req.params.userId });
    if (files.length === 0)
      return res.status(404).json({ message: "No files found for this user" });

    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: "Error fetching files" });
  }
});

module.exports = router;
