import React, { useState } from "react";
import "./CompanyLogin.css";
import Nav from "../Nav/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CompanyLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    companyRegisterNumber: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/users/login",
        formData
      );

      if (res.data) {
        localStorage.setItem("loggedUser", JSON.stringify(res.data)); // save user
        navigate(`/Details/${res.data._id}`);
      }
    } catch (err) {
      console.error(err);
      setError("Invalid login details");
    }
  };

  return (
    <>
      <div className="nav-div">
        <Nav />
      </div>

      <div className="login-background">
        <div className="login-container">
          <h2>Company Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />

            <label>Register Number</label>
            <input
              type="text"
              name="companyRegisterNumber"
              value={formData.companyRegisterNumber}
              onChange={handleChange}
              required
            />

            {error && <p className="error">{error}</p>}

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CompanyLogin;
