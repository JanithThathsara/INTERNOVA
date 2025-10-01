import React from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";
import "./ProfilePage.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/"); // go home
  };

  if (!user) {
    return (
      <div>
        <Nav />
        <h2>No logged-in company found. Please login.</h2>
      </div>
    );
  }

  return (
    <div class Name="profile-page-container">
      <Nav />
      <div className="profile-page">
        <h2>Company Profile</h2>
        <p><strong>Name:</strong> {user.companyName}</p>
        <p><strong>Email:</strong> {user.companyEmail}</p>
        <p><strong>Phone:</strong> {user.companyPhone}</p>
        <p><strong>Register Number:</strong> {user.companyRegisterNumber}</p>
        <p><strong>Address:</strong> {user.companyAddress}</p>
        <p><strong>Category:</strong> {user.companyCategory}</p>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
