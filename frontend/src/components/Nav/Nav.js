import React from "react";
import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedUser")); // get logged-in company

  const handleProfileClick = () => {
    if (user) {
      navigate("/profile"); // go to ProfilePage
    } else {
      navigate("/login"); // if not logged in, go to login
    }
  };

  return (
    <nav className="nav-container">
      <div className="nav-left">
        <h1>INTERNOVA</h1>
      </div>

      <div className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/job-posting">Job Posting</Link>
        <Link to="/notices">Notices</Link>
        <Link to="/company-reviews">Company Reviews</Link>

        <button className="profile-btn" onClick={handleProfileClick}>
          P
        </button>
      </div>
    </nav>
  );
}
