const express = require("express");
const router = express.Router();
const ReviewController = require("../Controllers/ReviewControllers");

// ✅ companies list with status
router.get("/companies", ReviewController.getCompaniesWithStats);

// reviews by companyId
router.get("/:companyId", ReviewController.getReviewsByCompany);

// add review
router.post("/:companyId", ReviewController.addReview);

// toggle like for individual review
router.post("/like/:id", ReviewController.toggleLikeReview);

// ✅ toggle like for company
router.post("/company-like/:companyId", ReviewController.toggleLikeCompany);

module.exports = router;
