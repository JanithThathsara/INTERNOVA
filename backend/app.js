const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./Routes/JobRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*", // temporarily allow all origins for testing
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Routes
app.use("/jobs", router);

// MongoDB Connection
const MONGO_URI = "mongodb+srv://admin:qLRpJ8YgncmgMohc@cluster0.bfcdsec.mongodb.net/jobdb?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(5000, () => console.log("🚀 Server running at http://localhost:5000"));
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));

//password
//qLRpJ8YgncmgMohc
//mongodb+srv://admin:<db_password>@cluster0.bfcdsec.mongodb.net/