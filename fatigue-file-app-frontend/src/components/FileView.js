// src/components/FileView.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axios from "axios";
import Note from "./Notes"; // Import the Note component
import "./FileView.css";

const FileView = () => {
  const { fileName } = useParams(); // Get file name from URL
  const navigate = useNavigate();
  const location = useLocation();
  const [timer, setTimer] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [fatigueLimit, setFatigueLimit] = useState(null);
  const [breakTime, setBreakTime] = useState(null);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [breakTimer, setBreakTimer] = useState(0);
  const { userId } = useUser(); // Get userId from context
  const fileId = new URLSearchParams(location.search).get("fileId");

  useEffect(() => {
    // Fetch the fatigue limit and break time from the API
    const fetchFatigueLimit = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/fatigue/${userId}`
        );
        setFatigueLimit(response.data.fatigueLimit);
        setBreakTime(response.data.breakTime); // Assuming the API response has breakTime
      } catch (error) {
        console.error("Error fetching fatigue limit:", error);
        alert("Failed to fetch fatigue limit.");
      }
    };

    fetchFatigueLimit();
  }, [userId]);

  useEffect(() => {
    let interval;
    if (isReading) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000); // Increment timer every second

      // Check if fatigue limit is reached
      if (fatigueLimit && timer >= fatigueLimit) {
        alert("You have reached your fatigue limit! Please take a break.");
        setIsReading(false); // Stop the timer
        setIsOnBreak(true); // Start break timer
        clearInterval(interval); // Clear the interval
      }
    }

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isReading, timer, fatigueLimit]);

  useEffect(() => {
    let breakInterval;
    if (isOnBreak) {
      breakInterval = setInterval(() => {
        setBreakTimer((prevBreakTime) => prevBreakTime + 1);
      }, 1000); // Increment break timer every second

      // End the break if break time is reached
      if (breakTime && breakTimer >= breakTime) {
        alert("Break time is over! You can resume reading.");
        setIsOnBreak(false);
        setBreakTimer(0);
        setTimer(0); // Reset the reading timer to allow a fresh session
      }
    }

    return () => clearInterval(breakInterval); // Cleanup interval on unmount
  }, [isOnBreak, breakTimer, breakTime]);

  const handleStartReading = () => {
    setIsReading(true);
  };

  const handleStopReading = () => {
    setIsReading(false);
    alert(`You spent ${timer} seconds reading the file.`);
    navigate("/files"); // Redirect to file list after stopping
  };

  return (
    <div className="file-view-container">
      <div className="file-and-notes-container">
        {/* File view section */}
        <div className="file-view-section">
          <h2>Viewing File: {fileName}</h2>
          <div className="file-frame">
            {isOnBreak ? (
              <div className="break-message">
                <h1 className="animated-text">
                  Hey, You have reached fatigue limit, Take a break, get out of
                  your seat, move around, have fun!
                </h1>
              </div>
            ) : (
              <iframe
                src={`http://localhost:3000/uploads/${fileName}`}
                title={fileName}
                className="file-iframe"
              />
            )}
          </div>
          <div className="controls">
            {!isReading && !isOnBreak && (
              <button onClick={handleStartReading} className="start-button">
                Start Reading
              </button>
            )}
            {isReading && (
              <button onClick={handleStopReading} className="stop-button">
                Stop Reading
              </button>
            )}
            {isOnBreak && <p>Please wait for your break to finish...</p>}
            <p>Time Spent: {timer} seconds</p>
            {fatigueLimit && <p>Fatigue Limit: {fatigueLimit} seconds</p>}
            {breakTime && <p>Break Time: {breakTime} seconds</p>}
            {isOnBreak && (
              <p>Break Time Remaining: {breakTime - breakTimer} seconds</p>
            )}
          </div>
        </div>

        {/* Notes Section */}
        <div className="notes-section">
          <Note fileId={fileId} />
        </div>
      </div>
    </div>
  );
};

export default FileView;
