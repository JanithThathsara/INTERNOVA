// Routes/AppRoutes.js
const express = require("express");
const router = express.Router();

const AppController = require("../Controllers/AppControllers");
const FileControllers = require("../Controllers/FileControllers");

// Use the same multer upload instance for POST and file update
// upload.fields will be applied in routes where files are expected

// List all
router.get("/", AppController.getAllApplications);

// Create new application (support files)
router.post(
  "/",
  FileControllers.upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "certifications", maxCount: 5 },
  ]),
  AppController.addApplications
);

// Get single
router.get("/:id", AppController.getById);

// Update details (admin or future use) - NOT used for file updates in UI
router.put("/:id", AppController.updateApplication);

// Delete
router.delete("/:id", AppController.deleteApplication);

// Update only files (CV/certifications)
router.put(
  "/:id/files",
  FileControllers.upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "certifications", maxCount: 5 },
  ]),
  FileControllers.updateFiles
);

module.exports = router;
