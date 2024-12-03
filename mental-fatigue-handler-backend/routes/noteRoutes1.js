// routes/noteRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Add a note
router.post("/:username/notes", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      { $push: { notes: req.body.note } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all notes
router.get("/:username/notes", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.json(user.notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
