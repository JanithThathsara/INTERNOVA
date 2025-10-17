import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Components
import Home from "./components/Home/Home";
import JobPosts from "./components/JobPost/JobPosts";
import AddJobPost from "./components/JobPost/AddJobPost";
import UpdateJob from "./components/JobPost/UpdateJob";

import CompanyRegisterPage from "./components/CompanyhomePage/CompanyHome";
import CompanyDetailsPage from "./components/CompanyDetailPage/CompanyDetails";
import CompanyUpdatePage from "./components/CompanyUpdatePage/CompanyUpdate";
import CompanyLogin from "./components/CompanyLogin/CompanyLogin";
import ProfilePage from "./components/ProfilePage/ProfilePage";

import OTPVerify from "./components/OTPVerify/OTPVerify";

import JobApplication from "./components/Application/JobApplication";
import ApplicationList from "./components/Application/ApplicationList";
import ApplicationDetails from "./components/Application/ApplicationDetails";

import CompanyReviews from "./components/CompanyReviews/CompanyReviews";
import Notice from "./Notice";

// Member Login Component
import Login from "./Login";

const App = () => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });

  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Default Home page */}
        <Route path="/" element={<Home />} />

        {/* Member login */}
        <Route path="/EmployerRegister" element={<Login setToken={setToken} setUserInfo={setUserInfo} />} />

        {/* Notices */}
        <Route path="/notices-dashboard/*" element={<Notice />} />

        {/* Job Routes */}
        <Route path="/job-posting" element={<JobPosts />} />
        <Route path="/add-job-post" element={<AddJobPost />} />
        <Route path="/update-job/:id" element={<UpdateJob />} />

        {/* Company Routes */}
        <Route path="/CompanyRegister" element={<CompanyRegisterPage />} />
        <Route path="/Details/:id" element={<CompanyDetailsPage />} />
        <Route path="/CompanyUpdate/:id" element={<CompanyUpdatePage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Application Routes */}
        <Route path="/newApplication" element={<JobApplication />} />
        <Route path="/applications" element={<ApplicationList />} />
        <Route path="/applications/:id" element={<ApplicationDetails />} />
        <Route path="/apply" element={<JobApplication />} />
        <Route path="/application-btn" element={<ApplicationDetails />} />

        {/* Reviews */}
        <Route path="/company-reviews" element={<CompanyReviews />} />

        {/* Auth / OTP */}
        <Route path="/verify-otp/:userId" element={<OTPVerify />} />
      </Routes>
    </div>
  );
};

export default App;
