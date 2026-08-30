const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// Serve Static Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/marks", require("./routes/marksRoutes"));
app.use("/api/certificates", require("./routes/certificateRoutes"));
app.use("/api/activities", require("./routes/activityRoutes"));
app.use("/api/behavior", require("./routes/behaviorRoutes"));
app.use("/api/ml", require("./routes/mlRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Student Performance Analyzer API is active",
    timestamp: new Date()
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Backend Error:", err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});