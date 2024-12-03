import React, { useEffect, useState } from "react";
import { getFiles } from "../api/api";
import { useNavigate } from "react-router-dom";
import "./Filelist.css";

const FileList = ({ userId }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 6; // Number of files per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await getFiles(userId);
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [userId]);

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = files.slice(indexOfFirstFile, indexOfLastFile);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(files.length / filesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <p className="file-list-message">Loading files...</p>;

  return (
    <div className="file-list-container">
      <h2 className="file-list-title">Uploaded Files</h2>
      <ul className="file-list">
        {currentFiles.map((file) => (
          <li key={file._id} className="file-item">
            <a
              href={`http://localhost:3000/${file.path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="file-link"
            >
              {file.originalName} ({Math.round(file.size / 1024)} KB)
            </a>
            <button
              onClick={() => navigate(`/view/${file.path}?fileId=${file._id}`)}
              className="view-button"
            >
              View File
            </button>
          </li>
        ))}
      </ul>
      <div className="pagination-controls">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {Math.ceil(files.length / filesPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(files.length / filesPerPage)}
          className="pagination-button"
        >
          Next
        </button>
      </div>
      <div className="file-list-footer">
        <button onClick={() => navigate("/upload")} className="upload-button">
          Upload New File
        </button>
      </div>
    </div>
  );
};

export default FileList;
