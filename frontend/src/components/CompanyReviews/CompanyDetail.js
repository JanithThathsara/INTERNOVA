import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CompanyDetail({ company, onClose }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ authorName: "", text: "", rating: 5 });

  useEffect(() => {
    fetchReviews();
  }, [company]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/reviews/${company._id}`);

      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5001/reviews/${company._id}`, newReview);

      setNewReview({ authorName: "", text: "", rating: 5 });
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleLike = async (reviewId) => {
    try {
      await axios.post(`/reviews/like/${reviewId}`, { userId: "guest" });
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="detail-panel">
      <button className="close-btn" onClick={onClose}>X</button>
      <div className="company-header">
        <h2>{company.companyName}</h2>
        <p><strong>Category:</strong> {company.companyCategory}</p>
        <p><strong>Address:</strong> {company.companyAddress}</p>
        <p><strong>Phone:</strong> {company.companyPhone}</p>
        <p><strong>Register No:</strong> {company.companyRegisterNumber}</p>
        <p><strong>Reviews:</strong> {company.reviewCount} | Likes: {company.totalLikes} | ⭐ {company.avgRating?.toFixed(1) || "N/A"}</p>
      </div>

      <div className="reviews">
        <h3>Reviews</h3>
        {reviews.length === 0 && <p>No reviews yet</p>}
        {reviews.map((r) => (
          <div key={r._id} className="review-card">
            <p><strong>{r.authorName}</strong> ⭐ {r.rating}</p>
            <p>{r.text}</p>
            <button onClick={() => toggleLike(r._id)}>👍 {r.likes}</button>
          </div>
        ))}
      </div>

      <form onSubmit={addReview} className="review-form">
        <input
          type="text"
          placeholder="Your name"
          value={newReview.authorName}
          onChange={(e) => setNewReview({ ...newReview, authorName: e.target.value })}
        />
        <textarea
          placeholder="Write a review"
          value={newReview.text}
          onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
        />
        <select
          value={newReview.rating}
          onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
        >
          {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <button type="submit">Add Review</button>
      </form>
    </div>
  );
}
