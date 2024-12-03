import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "../api/api";
import "./FileUpload.css"; // Import the CSS file

const FileUpload = ({ userId }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");

    setUploading(true);
    try {
      await uploadFile(userId, file);
      alert("File uploaded successfully!");
      navigate("/"); // Redirect to the file list page after success
    } catch (error) {
      console.error("File upload failed:", error);
      alert("File upload failed.");
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h2>Upload File</h2>
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="upload-button"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
