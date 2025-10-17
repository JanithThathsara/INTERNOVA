// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Routers
const jobRouter = require("./Routes/JobRoutes");
const userRouter = require("./Routes/UserRoute");
const reviewRoutes = require("./Routes/ReviewRoutes");
const applicationRouter = require("./Routes/AppRoutes");
const noticeRoutes = require("./Routes/noticeRoutes");
const messageRoutes = require("./routes/messageRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/jobs", jobRouter);
app.use("/users", userRouter);
app.use("/reviews", reviewRoutes);
app.use("/api/applications", applicationRouter);
app.use("/api/notices", noticeRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use('/api/users', userRouter);

// Serve uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Root endpoint
app.get("/", (req, res) => {
  res.send("🚀 API Working Fine!");
});

// MongoDB connection
const MONGO_URI = "mongodb+srv://admin:qLRpJ8YgncmgMohc@cluster0.bfcdsec.mongodb.net/jobdb?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    const PORT = 5001;
    app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
