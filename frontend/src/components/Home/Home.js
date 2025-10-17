import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav';
import './Home.css';
import { Link } from 'react-router-dom';

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // handle navigation when a button is clicked
  const handleChoice = (path) => {
    setShowPopup(false);
    navigate(path);
  };

  return (
    <>
      <div className="nav-div">
        <Nav />
      </div>
      <div className="home-container">
        {/* Header */}
        <header className="home-header">
          <h1>Career Launch</h1>
          <p>Launch your career with top internships and online opportunities. Explore, learn, and grow with our platform.</p>
        </header>

        {/* Features */}
        <section className="features-section">
          <Feature title="Verified Opportunities" desc="All roles are verified to give you a safe and professional experience." />
          <Feature title="Skill Development" desc="Learn and grow with opportunities designed to enhance your skills." />
          <Feature title="Global Network" desc="Connect with companies and mentors from around the world." />
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>Start Your Journey Today</h2>
          <p>Join thousands of students and professionals using CareerLaunch to discover opportunities and build their future.</p>
          <button className="cta-button" onClick={() => setShowPopup(true)}>Get Started</button>
        </section>

        {/* Footer */}
        <footer className="home-footer">
          &copy; 2025 CareerLaunch. All rights reserved.
        </footer>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Choose Your Role</h2>
            <p>Select how you want to continue:</p>
            <div className="popup-buttons">
            <Link to="/CompanyRegister" > <button onClick={() => handleChoice('/company')}>Company</button></Link>
             <Link to="/EmployerRegister" > <button onClick={() => handleChoice('/employer')}>Employer</button></Link>
            </div>
            <button className="close-btn" onClick={() => setShowPopup(false)}>X</button>
          </div>
        </div>
      )}
    </>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="feature-card">
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
