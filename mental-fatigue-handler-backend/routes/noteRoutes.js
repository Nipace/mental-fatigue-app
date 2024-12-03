// routes/noteRoutes.js
const express = require("express");
const router = express.Router();
const Note = require("../models/Notes"); // Import the Note model
const User = require("../models/User"); // Import the User model for verification (optional)

// Add a note
router.post("/:user_id/notes", async (req, res) => {
  try {
    const { file_id, note_text } = req.body; // Assume file_id and note_text are sent in the request body

    // Find the user by user_id
    const user = await User.findById(req.params.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new note and save it to the Notes collection
    const newNote = new Note({
      file_id,
      user_id: user._id, // Reference the user's ID
      note_text,
    });

    await newNote.save(); // Save the note to the Notes collection

    res.status(201).json({ message: "Note added successfully", note: newNote });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all notes for a user and a specific file
router.get("/:user_id/notes", async (req, res) => {
  try {
    const { file_id } = req.query; // file_id will be passed as a query parameter

    // Find the user by user_id
    const user = await User.findById(req.params.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find all notes associated with this user and file_id
    const notes = await Note.find({ user_id: user._id, file_id }).populate(
      "user_id",
      "username"
    ); // Optionally populate user data

    res.json(notes); // Return all the notes
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
