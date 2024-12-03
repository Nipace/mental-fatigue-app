// src/App.js
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";
import { useUser } from "./context/UserContext";
import FileView from "./components/FileView";

function App() {
  const { userId, setUserId } = useUser();

  useEffect(() => {
    // Retrieve userId from localStorage if it exists
    const storedUserId = localStorage.getItem("userId");
    console.log("storedUserId");
    console.log(storedUserId);
    if (storedUserId) setUserId(storedUserId);
  }, [setUserId]);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={userId ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/"
          element={
            userId ? <FileList userId={userId} /> : console.log("No userId")
          }
        />
        <Route
          path="/upload"
          element={
            userId ? <FileUpload userId={userId} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/view/uploads/:fileName"
          element={userId ? <FileView /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
