import React, { useEffect, useState } from "react";
import "./CompanyDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";

const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/users/${id}`) // ✅ adjust endpoint later if needed
      .then((res) => setCompany(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        await axios.delete(`http://localhost:5001/users/${id}`);
        alert("Company deleted successfully!");
        navigate("/");
      } catch (err) {
        console.error(err);
        alert("Error deleting company!");
      }
    }
  };

  const handleDownloadPDF = () => {
    if (!company) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Company Details", 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${company.companyName}`, 20, 40);
    doc.text(`Register Number: ${company.companyRegisterNumber}`, 20, 50);
    doc.text(`Address: ${company.companyAddress}`, 20, 60);
    doc.text(`Phone: ${company.companyPhone}`, 20, 70);
    doc.text(`Category: ${company.companyCategory}`, 20, 80);

    doc.save(`${company.companyName}_Details.pdf`);
  };

  if (!company) return <h2 className="no-data">Loading...</h2>;

  return (
    <>
      <div className="nav-div">
        <Nav />
      </div>

      <div className="company-details">
        <div className="details-card">
          <h2>Company Details</h2>
          <p>
            <strong>Name:</strong> {company.companyName}
          </p>
          <p>
            <strong>Register Number:</strong> {company.companyRegisterNumber}
          </p>
          <p>
            <strong>Address:</strong> {company.companyAddress}
          </p>
          <p>
            <strong>Phone:</strong> {company.companyPhone}
          </p>
          <p>
            <strong>Category:</strong> {company.companyCategory}
          </p>

          <div className="button-group">
  <button
    className="update-btn"
    onClick={() => navigate(`/CompanyUpdate/${id}`)}
  >
    Update
  </button>
  <button className="delete-btn" onClick={handleDelete}>
    Delete
  </button>
  <button className="pdf-btn" onClick={handleDownloadPDF}>
    Download PDF
  </button>

  <Link to="/application-btn">
    <button className="application-btn">
      Update stetus
    </button>
  </Link>
</div>

        </div>
      </div>
    </>
  );
};

export default CompanyDetails;
