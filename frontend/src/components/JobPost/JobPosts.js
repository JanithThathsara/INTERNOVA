import React, { useState, useEffect } from "react";
import "./JobPosts.css";
import AddJobPost from "./AddJobPost";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Nav from "../Nav/Nav";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function JobPosts() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ NEW state for search
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

  const handleDownloadExcel = () => {
    if (jobs.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(
      jobs.map((job) => ({
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

  const handleDownloadPDF = () => {
    if (jobs.length === 0) return;
    const doc = new jsPDF();
    doc.text("Job Posts", 14, 16);
    const tableColumn = ["Company Name", "Job Title", "Description", "Location", "Salary", "Experience"];
    const tableRows = [];
    jobs.forEach((job) => {
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
    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 20 });
    doc.save("job_posts.pdf");
  };

  // ✅ Filter jobs by search term
  const filteredJobs = jobs.filter((job) => {
    const search = searchTerm.toLowerCase();
    return (
      job.Cname.toLowerCase().includes(search) ||
      job.jobtitle.toLowerCase().includes(search)
    );
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="nav-div">
        <Nav />
      </div>

      {/* ✅ Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by Company Name or Job Title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="job-cards-container">
        {filteredJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          filteredJobs.map((job) => (
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
      <div className="download-buttons">
        <button onClick={handleDownloadExcel}>⬇️ Download Excel</button>
        <button onClick={handleDownloadPDF}>⬇️ Download PDF</button>
      </div>

      <footer className="jobposts-footer">
        <AddJobPost onJobAdded={handleJobAdded} />
        <Link to="/applications">
          <button className="view-applications-btn">📄 View Applications</button>
        </Link>
        <p>&copy; 2025 CareerLaunch. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default JobPosts;
