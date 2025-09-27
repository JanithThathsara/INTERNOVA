import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "./ApplicationList.css";

const API_ROOT = "http://localhost:5000";

export default function ApplicationList() {
  const navigate = useNavigate();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const fetchApps = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_ROOT}/api/applications`);
      if (!res.ok) throw new Error("Failed to fetch apps");
      const data = await res.json();
      setApps(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setApps([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const filtered = apps.filter((a) => {
    if (!query.trim()) return true;
    const q = query.trim().toLowerCase();
    return (
      (a.firstName || "").toLowerCase().includes(q) ||
      (a.lastName || "").toLowerCase().includes(q) ||
      (a.email || "").toLowerCase().includes(q) ||
      (a.city || "").toLowerCase().includes(q)
    );
  });

  const handleView = (id) => navigate(`/applications/${id}`);

  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 30;
    doc.setFontSize(12);
    doc.text("Submitted Applications Report", 14, 15);

    filtered.forEach((app, i) => {
      const line = `${i + 1}. ${app.firstName} ${app.lastName} — ${app.email} — ${app.city || "-"} — ${app.joblookingfor || "-"}`;
      doc.text(line, 14, y);
      y += 8;
      if (y > 280) {
        doc.addPage();
        y = 12;
      }
    });
    doc.save("applications_report.pdf");
  };

  return (
    <div className="list-page">
      <div className="list-header">
        <h2>Submitted Applications</h2>
        <div className="list-actions">
          <button onClick={generatePDF}>Download PDF</button>
          <button onClick={() => navigate("/newApplication")}>New Application</button>
        </div>
      </div>

      <div className="list-search">
        <input placeholder="Search by name, email or city..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="list-scroll">
        {loading ? (
          <div className="no-results">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="no-results">No applications found.</div>
        ) : (
          <table className="apps-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Email</th>
                <th>Looking For</th>
                <th>Years</th>
                <th>Submitted</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app._id}>
                  <td>{app.firstName} {app.lastName}</td>
                  <td>{app.city || "-"}</td>
                  <td>{app.email || "-"}</td>
                  <td>{app.joblookingfor || "-"}</td>
                  <td>{app.years ?? "-"}</td>
                  <td>{app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "-"}</td>
                  <td><button onClick={() => handleView(app._id)}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
