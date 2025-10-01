import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../Nav/Nav";
import "./OTPVerify.css"; //

const OTPVerify = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/users/verify-otp", { userId, otp });
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Invalid OTP");
    }
  };

  return (
    <>
      <div className="nav-div"><Nav /></div>
      <div className="otp-container">
        <h2 className="otp-title">Verify OTP</h2>
        <form onSubmit={handleSubmit} className="otp-form">
          <input
            type="text"
            className="otp-input"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="otp-btn">Verify</button>
        </form>
      </div>
    </>
  );
};

export default OTPVerify;
