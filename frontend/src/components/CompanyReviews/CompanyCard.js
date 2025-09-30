import React from "react";

export default function CompanyCard({ company, onClick }) {
  return (
    <div className="company-card" onClick={() => onClick(company)}>
      <div className="card-header">
        <h3>{company.companyName}</h3>
        <span className="rating">⭐ {company.avgRating ? company.avgRating.toFixed(1) : "N/A"}</span>
      </div>
      <p className="address">{company.companyAddress}</p>
      <div className="card-meta">
        <span>📞 {company.companyPhone}</span>
        <span>🆔 {company.companyRegisterNumber}</span>
      </div>
      <div className="card-meta">
        <span>💬 {company.reviewCount} Reviews</span>
        <span>👍 {company.totalLikes} Likes</span>
      </div>
    </div>
  );
}
