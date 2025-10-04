import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CompanyReviews.css";
import Nav from "../Nav/Nav";

export default function CompanyReviews() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null); // for showing comments
  const [comments, setComments] = useState({}); // store comments by companyId
  const [commentText, setCommentText] = useState({}); // new comment text per company

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5001/reviews/companies");
      setCompanies(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load comments for one company
  const fetchComments = async (companyId) => {
    try {
      const res = await axios.get(`http://localhost:5001/reviews/${companyId}`);
      setComments((prev) => ({ ...prev, [companyId]: res.data }));
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Toggle comment section
  const toggleComments = (companyId) => {
    if (expanded === companyId) {
      setExpanded(null);
    } else {
      setExpanded(companyId);
      fetchComments(companyId);
    }
  };

  // ✅ Like button handler
  const handleLike = async (companyId) => {
    // Optimistically update UI
    setCompanies((prev) =>
      prev.map((c) =>
        c._id === companyId ? { ...c, totalLikes: c.totalLikes + 1 } : c
      )
    );
    try {
      const res = await axios.post(`http://localhost:5001/reviews/company-like/${companyId}`, {
        userId: "guest",
      });
      // If backend returns updated company, update only that company
      if (res.data && typeof res.data.totalLikes === "number") {
        setCompanies((prev) =>
          prev.map((c) =>
            c._id === companyId ? { ...c, totalLikes: res.data.totalLikes } : c
          )
        );
      }
      // No need to call fetchCompanies() here
    } catch (err) {
      console.error(err);
      // Revert like if error
      setCompanies((prev) =>
        prev.map((c) =>
          c._id === companyId ? { ...c, totalLikes: c.totalLikes - 1 } : c
        )
      );
    }
  };

  // ✅ Add comment handler
  const handleComment = async (companyId) => {
    const text = commentText[companyId]?.trim();
    if (!text) return;

    try {
      await axios.post(`http://localhost:5001/reviews/${companyId}`, {
        authorName: "Guest",
        text,
        rating: 5,
      });
      setCommentText((prev) => ({ ...prev, [companyId]: "" }));
      fetchComments(companyId);
      fetchCompanies();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="company-reviews">
      <Nav />
    <div className="modern-page">
      <header className="modern-header">
        <h1>Company Reviews</h1>
        <p>Like and comment on your favorite companies 💜</p>
      </header>

      {loading && <div className="loading">Loading companies...</div>}

      <div className="modern-grid">
        {!loading &&
          companies.map((c) => (
            <div key={c._id} className="modern-card">
              <div className="card-top">
                <div>
                  <h3>{c.companyName}</h3>
                  <p className="category">{c.companyCategory || "General"}</p>
                </div>
                <span className="rating">⭐ {c.avgRating ? c.avgRating.toFixed(1) : "N/A"}</span>
              </div>

              <p className="address">{c.companyAddress}</p>

              <div className="stats-row">
                <span>💬 {c.reviewCount} Comments</span>
                <span>👍 {c.totalLikes} Likes</span>
              </div>

              <div className="actions">
                <button className="like-btn" onClick={() => handleLike(c._id)}>
                  👍 Like
                </button>
                <button className="comment-btn" onClick={() => toggleComments(c._id)}>
                  💬 Comments
                </button>
              </div>

              {expanded === c._id && (
                <div className="comment-section">
                  {comments[c._id] ? (
                    comments[c._id].length > 0 ? (
                      comments[c._id].map((r) => (
                        <div key={r._id} className="comment">
                          <strong>{r.authorName}</strong>: {r.text}
                        </div>
                      ))
                    ) : (
                      <p className="no-comments">No comments yet</p>
                    )
                  ) : (
                    <p className="loading-comments">Loading...</p>
                  )}

                  <div className="comment-box">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={commentText[c._id] || ""}
                      onChange={(e) =>
                        setCommentText((prev) => ({ ...prev, [c._id]: e.target.value }))
                      }
                    />
                    <button className="send-btn" onClick={() => handleComment(c._id)}>
                      ➤
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
    </div>
  );
}
