import React, { useState } from "react";
import "./CompanyHome.css";
import Nav from "../Nav/Nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CompanyHome = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    companyRegisterNumber: "",
    companyAddress: "",
    companyPhone: "",
    companyCategory: "",
    companyEmail: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/users", formData);
      alert("OTP sent to your email!");
      navigate(`/verify-otp/${res.data.userId}`);
    } catch (err) {
      console.error(err);
      alert("Error registering company!");
    }
  };

  return (
    <>
      <div className="nav-div">
        <Nav />
      </div>

      <div className="company-home">
        <div className="form-container">
          <h2 className="form-title">Company Registration</h2>
          <form onSubmit={handleSubmit}>
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />

            <label>Company Register Number</label>
            <input
              type="text"
              name="companyRegisterNumber"
              value={formData.companyRegisterNumber}
              onChange={handleChange}
              required
            />

            <label>Company Address</label>
            <textarea
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              required
            />

            <label>Company Phone Number</label>
            <input
              type="tel"
              name="companyPhone"
              value={formData.companyPhone}
              onChange={handleChange}
              required
            />

            <label>Company Category</label>
            <select
              name="companyCategory"
              value={formData.companyCategory}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="Software Development">Software Development</option>
              <option value="Marketing">Marketing & Advertising</option>
              <option value="Other">Other</option>
            </select>

            <label>Company Email</label>
            <input
              type="email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleChange}
              required
            />

            <button type="submit" className="submit-btn">
              Save Company
            </button>
            <button
              type="button"
              className="login-btn"
              onClick={() => navigate("/login")}
              style={{ marginLeft: "10px" }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CompanyHome;
