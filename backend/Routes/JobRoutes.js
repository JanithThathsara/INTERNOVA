const express = require("express");
const router = express.Router();
const JobController = require("../Controllers/JobController");

router.get("/", JobController.getAllJobs);
router.post("/", JobController.addJob);
router.get("/:id", JobController.getById);
router.put("/:id", JobController.updateJob);
router.delete("/:id", JobController.deleteJob);

module.exports = router;
