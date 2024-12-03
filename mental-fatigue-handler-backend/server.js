// server.js
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const fatigueRoutes = require("./routes/fatigueRoutes");
const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");
const fileRoutes = require("./routes/fileRoutes");
const cors = require("cors"); // Import CORS
const path = require("path");

require("dotenv").config();

// Initialize app and database connection
const app = express();
connectDB();
app.use(cors());

// Middleware

app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/fatigue", fatigueRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);
app.use("/api/files", fileRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
