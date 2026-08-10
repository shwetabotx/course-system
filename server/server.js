const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Student routes
app.use("/api/students", studentRoutes);

// Test route
app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Student Course Enrollment API is running"
    });

});

// Start server
app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});