import React, { useState } from "react";
import "./AddJobPost.css";
import axios from "axios";

function AddJobPost({ onJobAdded }) {
  const [showForm, setShowForm] = useState(false);
  const [newJob, setNewJob] = useState({
    jobtitle: "",
    Cname: "",
    Cpropic: "",
    Cdescription: "",
    Clocation: "",
    experience: "",
    salary: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/jobs", newJob);
      alert("✅ Job added successfully!");

      // Update JobPosts state
      if (onJobAdded) onJobAdded(res.data);

      setShowForm(false);
      // Reset form
      setNewJob({
        jobtitle: "",
        Cname: "",
        Cpropic: "",
        Cdescription: "",
        Clocation: "",
        experience: "",
        salary: ""
      });
    } catch (err) {
      console.error("Error adding job:", err);
      alert("❌ Failed to add job. Check backend & CORS.");
    }
  };

  return (
    <div>
      <button className="open-form-btn" onClick={() => setShowForm(true)}>
        ➕ Add Job Post
      </button>
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add a Job Post</h2>
            <form onSubmit={handleAddJob}>
              <input type="text" name="jobtitle" placeholder="Job Title" value={newJob.jobtitle} onChange={handleInputChange} required />
              <input type="text" name="Cname" placeholder="Company Name" value={newJob.Cname} onChange={handleInputChange} required />
              <input type="text" name="Cpropic" placeholder="Company Logo URL" value={newJob.Cpropic} onChange={handleInputChange} required />
              <input type="text" name="Cdescription" placeholder="Job Description" value={newJob.Cdescription} onChange={handleInputChange} required />
              <input type="text" name="Clocation" placeholder="Location" value={newJob.Clocation} onChange={handleInputChange} required />
              <input type="text" name="experience" placeholder="Experience (e.g., 0-2 years)" value={newJob.experience} onChange={handleInputChange} required />
              <input type="number" name="salary" placeholder="Salary" value={newJob.salary} onChange={handleInputChange} required />
              <div className="modal-actions">
                {/* ✅ FIXED: onClick instead of onclick */}
                <button type="submit" className="submit-btn">✅ Add Job</button>
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>❌ Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddJobPost;