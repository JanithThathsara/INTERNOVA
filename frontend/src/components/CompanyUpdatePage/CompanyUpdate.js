import React, { useEffect, useState } from "react";
import "./CompanyUpdate.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CompanyUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    companyRegisterNumber: "",
    companyAddress: "",
    companyPhone: "",
    companyCategory: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${id}`)
      .then(res => setFormData(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/users/${id}`, formData);
      alert("Company Updated Successfully!");
      navigate(`/Details/${id}`);
    } catch (err) {
      console.error(err);
      alert("Error updating company!");
    }
  };

  return (
    <div className="update-page">
      <div className="update-container">
        <h2>Update Company</h2>
        <form onSubmit={handleSubmit}>
          <label>Company Name</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />

          <label>Registration Number</label>
          <input type="text" name="companyRegisterNumber" value={formData.companyRegisterNumber} onChange={handleChange} required />

          <label>Address</label>
          <textarea name="companyAddress" value={formData.companyAddress} onChange={handleChange} required />

          <label>Phone</label>
          <input type="tel" name="companyPhone" value={formData.companyPhone} onChange={handleChange} required />

          <label>Category</label>
          <select name="companyCategory" value={formData.companyCategory} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
           <option value="Software">Software Development</option>
            <option value="Marketing">Marketing & Advertising</option>
            <option value="Other">Other</option>
          </select>

          <button type="submit" className="save-btn">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default CompanyUpdate;
