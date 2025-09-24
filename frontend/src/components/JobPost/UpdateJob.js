import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UpdateJob.css";

function UpdateJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({
    jobtitle: "",
    Cname: "",
    Cpropic: "",
    Cdescription: "",
    Clocation: "",
    experience: "",
    salary: ""
  });

  // Fetch existing job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error("Error fetching job:", err);
      }
    };
    fetchJob();
  }, [id]);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/jobs/${id}`, job);
      alert("✅ Job updated successfully!");
      navigate("/job-posting");
    } catch (err) {
      console.error("Error updating job:", err);
      alert("❌ Failed to update job.");
    }
  };

  return (
    <div className="modal">
      <h2>Update Job</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="jobtitle" value={job.jobtitle} onChange={handleChange} required />
        <input type="text" name="Cname" value={job.Cname} onChange={handleChange} required />
        <input type="text" name="Cpropic" value={job.Cpropic} onChange={handleChange} required />
        <input type="text" name="Cdescription" value={job.Cdescription} onChange={handleChange} required />
        <input type="text" name="Clocation" value={job.Clocation} onChange={handleChange} required />
        <input type="text" name="experience" value={job.experience} onChange={handleChange} required />
        <input type="number" name="salary" value={job.salary} onChange={handleChange} required />
        <button type="submit">✅ Update</button>
        <button type="button" onClick={() => navigate("/job-posting")}>❌ Cancel</button>
      </form>
    </div>
  );
}

export default UpdateJob;
