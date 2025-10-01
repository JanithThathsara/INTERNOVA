import React, { useEffect, useState } from "react";
import axios from "axios";
import CompanyCard from "./CompanyCard";
import CompanyDetail from "./CompanyDetail";
import "./CompanyReviews.css";

export default function CompanyReviews() {
  const [companies, setCompanies] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  fetchCompanies();
}, []);


const fetchCompanies = async () => {
  try {
    setLoading(true);
    const res = await axios.get("http://localhost:5000/reviews/companies"); // status 
    setCompanies(res.data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  const openCompany = (company) => setSelected(company);
  const closeDetail = () => setSelected(null);

  return (
    <div className="page">
      <header className="page-header">
        <h1>Company Reviews</h1>
        <p>See companies, their category, and contact details. Click a company to view more.</p>
      </header>

      <main className="grid">
        {loading && <div>Loading companies...</div>}
        {!loading && companies.length === 0 && <div>No companies found</div>}
        {companies.map((c) => (
          <CompanyCard key={c._id} company={c} onClick={openCompany} />
        ))}
      </main>

      {selected && (
        <div className="overlay">
          <CompanyDetail company={selected} onClose={closeDetail} />
        </div>
      )}
    </div>
  );
}
