// src/components/Note.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext"; // Assuming you are using UserContext to access userId

const Note = () => {
  const { userId } = useUser(); // Get userId from context
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // Fetch notes from the API
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/notes/nipesh/notes`
        );
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    if (userId) {
      fetchNotes();
    }
  }, [userId]);

  // Add new note
  const handleAddNote = async () => {
    if (newNote.trim() === "") return; // Prevent empty notes

    try {
      const response = await axios.post(
        `http://localhost:3000/api/notes/nipesh/notes`,
        { note: newNote }
      );
      setNotes(response.data.notes); // Update the notes list after adding a new note
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
          notes.map((note, index) => (
            <div key={index} className="note-item">
              <p>{note}</p>
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
