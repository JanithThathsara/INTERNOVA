const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // points to company
    authorName: { type: String, default: "Anonymous", trim: true },
    authorId: { type: String, default: null }, // optional (if you have auth)
    rating: { type: Number, min: 1, max: 5, default: 5 },
    text: { type: String, trim: true },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: String }], // store userId or identifier (avoid duplications)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
