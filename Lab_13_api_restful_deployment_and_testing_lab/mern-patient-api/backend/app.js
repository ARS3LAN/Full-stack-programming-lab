const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());

// Database Connection
const connectDB = require("./config/db");
connectDB();

// Test Route
app.get("/", (req, res) => {
    res.json({ message: "API is running!" });
});

module.exports = app;