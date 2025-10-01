import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ApplicationDetails.css";

const API_ROOT = "http://localhost:5000";

export default function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState({});
  const [cvFile, setCvFile] = useState(null);
  const [certFiles, setCertFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const fetchApplication = async () => {
    try {
      const res = await fetch(`${API_ROOT}/api/applications/${id}`);
      const data = await res.json();
      setApplication(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch application");
    }
  };

  useEffect(() => {
    fetchApplication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update CV or Certifications
  const handleUpdate = async () => {
    if (!cvFile && certFiles.length === 0) {
      alert("Select CV or certifications to update.");
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      if (cvFile) fd.append("cv", cvFile);
      if (certFiles.length) certFiles.forEach((file) => fd.append("certifications", file));

      const res = await fetch(`${API_ROOT}/api/applications/${id}/files`, {
        method: "PUT",
        body: fd,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Update failed");
      }

      alert("Application updated successfully!");
      fetchApplication(); // refresh details
      setCvFile(null);
      setCertFiles([]);
    } catch (err) {
      console.error(err);
      alert("Update failed. See console.");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Application
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;

    try {
      const res = await fetch(`${API_ROOT}/api/applications/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      alert("Application deleted successfully!");
      navigate("/applications");
    } catch (err) {
      console.error(err);
      alert("Delete failed. See console.");
    }
  };

  return (
    <div className="application-details-container">
      <div className="application-details-page">
        <h2>Application Details</h2>

        <div className="details-section">
          {application ? (
            <>
              <p><strong>Name:</strong> {application.firstName} {application.lastName}</p>
              <p><strong>Phone:</strong> {application.phone}</p>
              <p><strong>Email:</strong> {application.email}</p>
              <p><strong>Date of Birth:</strong> {application.birth}</p>
              <p><strong>Address:</strong> {application.address}</p>
              <p><strong>City:</strong> {application.city}</p>
              <p><strong>Gender:</strong> {application.gender}</p>
              <p><strong>Education:</strong> {application.education}</p>
              <p><strong>Looking For:</strong> {application.joblookingfor}</p>
              <p><strong>Experiences:</strong> {application.experiences}</p>
              <p><strong>Years of Experience:</strong> {application.years}</p>
              <p>
                <strong>CV:</strong>{" "}
                {application.cv ? <a href={application.cv} target="_blank" rel="noreferrer">View CV</a> : "None"}
              </p>
              <p>
                <strong>Certifications:</strong>{" "}
                {application.certifications && application.certifications.length > 0 ? (
                  application.certifications.map((file, i) => (
                    <span key={i}>
                      <a href={file} target="_blank" rel="noreferrer">File {i + 1}</a>{" "}
                    </span>
                  ))
                ) : "None"}
              </p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="update-section">
          <h3>Update CV or Certifications</h3>

          <label>Update CV</label>
          <input type="file" onChange={(e) => setCvFile(e.target.files[0])} />

          <label>Update Certifications (multiple)</label>
          <input type="file" onChange={(e) => setCertFiles(Array.from(e.target.files))} multiple />

          <div className="details-buttons">
            <button onClick={handleUpdate} disabled={submitting}>
              {submitting ? "Updating…" : "Update"}
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
            <button className="back-btn" onClick={() => navigate("/applications")}>
              Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
