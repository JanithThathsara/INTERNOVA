import React, { useState, useEffect } from "react";
import "./JobPosts.css";
import AddJobPost from "./AddJobPost";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from '../Nav/Nav';
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // <-- fixed import
import { Link } from "react-router-dom";

function JobPosts() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5001/jobs");
      setJobs(res.data.jobs);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setLoading(false);
    }
  };

  const handleJobAdded = (newJob) => {
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`http://localhost:5001/jobs/${id}`);
        setJobs(jobs.filter((job) => job._id !== id));
      } catch (err) {
        console.error("Error deleting job:", err);
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-job/${id}`);
  };

  // Download Excel
  const handleDownloadExcel = () => {
    if (jobs.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(
      jobs.map(job => ({
        "Company Name": job.Cname,
        "Job Title": job.jobtitle,
        Description: job.Cdescription,
        Location: job.Clocation,
        Salary: job.salary,
        Experience: job.experience,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Jobs");
    XLSX.writeFile(workbook, "job_posts.xlsx");
  };

  // Download PDF
  const handleDownloadPDF = () => {
    if (jobs.length === 0) return;

    const doc = new jsPDF();
    doc.text("Job Posts", 14, 16);

    const tableColumn = ["Company Name", "Job Title", "Description", "Location", "Salary", "Experience"];
    const tableRows = [];

    jobs.forEach(job => {
      const jobData = [
        job.Cname,
        job.jobtitle,
        job.Cdescription,
        job.Clocation,
        job.salary,
        job.experience,
      ];
      tableRows.push(jobData);
    });

    autoTable(doc, {   // <-- call autoTable directly
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("job_posts.pdf");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="nav-div">
        <Nav />
      </div>
      <div className="job-cards-container">
        {jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="job-card">
              <div className="job-header">
                <img src={job.Cpropic} alt="Company Logo" className="company-logo" />
                <div>
                  <h2 className="company-name">{job.Cname}</h2>
                  <h3 className="job-title">{job.jobtitle}</h3>
                </div>
              </div>
              <p className="job-description">{job.Cdescription}</p>
              <div className="job-details">
                <p>📍 {job.Clocation}</p>
                <p>💰 ${job.salary}</p>
                <p>🕑 {job.experience}</p>
              </div>
              <Link to="/apply">
              <button className="apply-btn">Apply Now</button>
              </Link>
              <div className="job-actions">
                <button onClick={() => handleUpdate(job._id)}>✏️ Update</button>
                <button onClick={() => handleDelete(job._id)}>🗑️ Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Download Buttons */}
      <div style={{ position: "fixed", bottom: "20px", right: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <button
          onClick={handleDownloadExcel}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0,0,0,0.2)"
          }}
        >
          ⬇️ Download Excel
        </button>
        <button
          onClick={handleDownloadPDF}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0,0,0,0.2)"
          }}
        >
          ⬇️ Download PDF
        </button>
      </div>

      <footer className="jobposts-footer">
        <AddJobPost onJobAdded={handleJobAdded} />
        {/* View Applications button */}
    <Link to="/applications">
      <button
        style={{
          padding: "12px 24px",
          marginTop: "10px",
          background: "linear-gradient(135deg, #1e3c72, #2a5298)", 
          color: "#fff",
          border: "none",
          borderRadius: "12px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 6px 20px rgba(30,60,114,0.4)",
          transition: "all 0.3s ease"
        }}
      >
        📄 View Applications
      </button>
    </Link>
        <p>&copy; 2025 CareerLaunch. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default JobPosts;
