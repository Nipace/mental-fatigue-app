import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext"; // Assuming you are using UserContext to access userId

const Note = ({ fileId }) => {
  const { userId } = useUser(); // Get userId from context
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // Fetch notes from the API
  useEffect(() => {
    const fetchNotes = async () => {
      if (!userId || !fileId) return; // Ensure we have userId and fileId before making the request
      try {
        const response = await axios.get(
          `http://localhost:3000/api/notes/${userId}/notes?file_id=${fileId}`
        );
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [userId, fileId]); // Add fileId to dependencies if fileId changes

  // Add new note
  const handleAddNote = async () => {
    if (!userId || !newNote.trim()) return; // Prevent empty notes or if userId is not available

    try {
      const response = await axios.post(
        `http://localhost:3000/api/notes/${userId}/notes`, // Use dynamic userId
        { note_text: newNote, file_id: fileId } // Pass note_text and file_id in request body
      );
      setNotes([...notes, response.data.note]); // Add the new note to the list
      setNewNote(""); // Clear the input field
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div className="note-container">
      <h3>Your Notes</h3>
      <div className="notes-list">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note._id} className="note-item">
              <p>{note.note_text}</p>{" "}
              {/* Assuming note_text is stored in the Note schema */}
            </div>
          ))
        ) : (
          <p>No notes yet. Add one below!</p>
        )}
      </div>
      <div className="add-note">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write your note here"
        />
        <button onClick={handleAddNote} className="add-note-button">
          Add Note
        </button>
      </div>
    </div>
  );
};

export default Note;
