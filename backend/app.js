// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Import Routers
const jobRouter = require("./Routes/JobRoutes");
const userRouter = require("./Routes/UserRoute");
const applicationRouter = require("./Routes/AppRoutes"); // applications CRUD

const app = express();

// Middleware
app.use(cors({
  origin: "*", // later can replace with frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse form data

// Routes
app.use("/jobs", jobRouter);                     // Job CRUD
app.use("/users", userRouter);                   // Company/User CRUD
app.use("/api/applications", applicationRouter); // Applications CRUD

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection (directly here, no .env)
const MONGO_URI = "mongodb+srv://admin:qLRpJ8YgncmgMohc@cluster0.bfcdsec.mongodb.net/jobdb?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(" Connected to MongoDB");
    const port = 5000; // fixed port
    app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
  })
  .catch(err => console.error(" MongoDB connection error:", err));
