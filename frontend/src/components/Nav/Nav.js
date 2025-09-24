import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="nav-container">
      {/* Left side: Logo */}
      <div className="nav-left">
        <h1>INTERNOVA</h1>
      </div>

      {/* Right side: Pages and Profile Icon */}
      <div className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/job-posting">Job Posting</Link>
        <Link to="/notices">Notices</Link>
        <Link to="/company-reviews">Company Reviews</Link>
        <button className="profile-btn">P</button>
      </div>
    </nav>
  );
}



