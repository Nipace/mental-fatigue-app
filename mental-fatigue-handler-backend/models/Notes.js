const mongoose = require("mongoose");

// Note schema
const noteSchema = new mongoose.Schema({
  file_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  note_text: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
