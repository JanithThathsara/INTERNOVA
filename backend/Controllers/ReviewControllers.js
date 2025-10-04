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

// Toggle like/unlike for a review (existing)
const toggleLikeReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "userId required" });

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    const idx = review.likedBy.indexOf(userId);
    if (idx === -1) {
      review.likedBy.push(userId);
      review.likes = (review.likes || 0) + 1;
    } else {
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

// ✅ Toggle like/unlike for a company
const toggleLikeCompany = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "userId required" });

    const company = await User.findById(companyId);
    if (!company) return res.status(404).json({ message: "Company not found" });

    // initialize if not exist
    if (!company.likedBy) company.likedBy = [];
    if (!company.likes) company.likes = 0;

    if (!company.likedBy.includes(userId)) {
      company.likedBy.push(userId);
      company.likes += 1;
    } else {
      company.likedBy = company.likedBy.filter((id) => id !== userId);
      company.likes = Math.max(company.likes - 1, 0);
    }

    await company.save();
    return res.status(200).json({ likes: company.likes, likedBy: company.likedBy });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get companies with aggregated stats: reviewCount and totalLikes (per company)
const getCompaniesWithStats = async (req, res) => {
  try {
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

    const statsMap = {};
    agg.forEach((a) => {
      statsMap[a._id.toString()] = {
        reviewCount: a.reviewCount,
        totalLikes: a.totalLikes,
        avgRating: a.avgRating,
      };
    });

    const companies = await User.find().sort({ createdAt: -1 }).lean();

    const results = companies.map((c) => {
      const s = statsMap[c._id.toString()] || { reviewCount: 0, totalLikes: 0, avgRating: null };
      return {
        ...c,
        reviewCount: s.reviewCount,
        totalLikes: s.totalLikes + (c.likes || 0), // include company likes
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
  toggleLikeCompany, // ✅ added
  getCompaniesWithStats,
};
