const Review = require("../Model/ReviewModel");
const User = require("../Model/UserModel"); // your company model

// Get reviews for a company
const getReviewsByCompany = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const reviews = await Review.find({ company: companyId }).sort({ createdAt: -1 });
    return res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Add a review to a company
const addReview = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const { authorName, authorId, rating, text } = req.body;

    // Basic validation
    const company = await User.findById(companyId);
    if (!company) return res.status(404).json({ message: "Company not found" });

    const review = new Review({
      company: companyId,
      authorName: authorName || "Anonymous",
      authorId: authorId || null,
      rating: rating || 5,
      text: text || "",
    });

    await review.save();
    return res.status(201).json(review);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Unable to add review" });
  }
};

// Toggle like/unlike for a review
// Expects in body: { userId: "<some id or identifier>" }
const toggleLikeReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "userId required" });

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    const idx = review.likedBy.indexOf(userId);
    if (idx === -1) {
      // like
      review.likedBy.push(userId);
      review.likes = (review.likes || 0) + 1;
    } else {
      // unlike
      review.likedBy.splice(idx, 1);
      review.likes = Math.max((review.likes || 1) - 1, 0);
    }

    await review.save();
    return res.status(200).json({ likes: review.likes, likedBy: review.likedBy });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Unable to toggle like" });
  }
};

// Get companies with aggregated stats: reviewCount and totalLikes (per company)
const getCompaniesWithStats = async (req, res) => {
  try {
    // Aggregation: group reviews by company
    const agg = await Review.aggregate([
      {
        $group: {
          _id: "$company",
          reviewCount: { $sum: 1 },
          totalLikes: { $sum: "$likes" },
          avgRating: { $avg: "$rating" },
        },
      },
    ]);

    // Convert to map for quick lookup
    const statsMap = {};
    agg.forEach((a) => {
      statsMap[a._id.toString()] = {
        reviewCount: a.reviewCount,
        totalLikes: a.totalLikes,
        avgRating: a.avgRating,
      };
    });

    // Get companies
    const companies = await User.find().sort({ createdAt: -1 }).lean();

    // Attach stats
    const results = companies.map((c) => {
      const s = statsMap[c._id.toString()] || { reviewCount: 0, totalLikes: 0, avgRating: null };
      return {
        ...c,
        reviewCount: s.reviewCount,
        totalLikes: s.totalLikes,
        avgRating: s.avgRating,
      };
    });

    return res.status(200).json(results);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getReviewsByCompany,
  addReview,
  toggleLikeReview,
  getCompaniesWithStats,
};
// ReviewControllers.js