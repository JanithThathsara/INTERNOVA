const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import Routers
const jobRouter = require("./Routes/JobRoutes");
const userRouter = require("./Routes/UserRoute"); // ⚡ check correct file path

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*", // can change to frontend URL later
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Routes
app.use("/jobs", jobRouter);   // Job CRUD
app.use("/users", userRouter); // Company/User CRUD

// MongoDB Connection
const MONGO_URI = "mongodb+srv://admin:qLRpJ8YgncmgMohc@cluster0.bfcdsec.mongodb.net/jobdb?retryWrites=true&w=majority";
// OR use CompanyDB if you want separate DB
// const MONGO_URI = "mongodb+srv://Admin:0dZ65NWYcN8v5OP4@cluster0.3ce5d2p.mongodb.net/CompanyDB?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(5000, () => console.log("🚀 Server running at http://localhost:5000"));
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
