import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Home
import Home from "./components/Home/Home";

// Job CRUD
import JobPosts from "./components/JobPost/JobPosts";
import AddJobPost from "./components/JobPost/AddJobPost";
import UpdateJob from "./components/JobPost/UpdateJob";

// Company CRUD
import CompanyRegisterPage from "./components/CompanyhomePage/CompanyHome";
import CompanyDetailsPage from "./components/CompanyDetailPage/CompanyDetails";
import CompanyUpdatePage from "./components/CompanyUpdatePage/CompanyUpdate";
import CompanyLogin from "./components/CompanyLogin/CompanyLogin";
// OTP Verify
import OTPVerify from "./components/OTPVerify/OTPVerify";


// Applications
import JobApplication from "./components/Application/JobApplication";
import ApplicationList from "./components/Application/ApplicationList";
import ApplicationDetails from "./components/Application/ApplicationDetails";

<<<<<<< HEAD
//reviews page import
import CompanyReviews from "./components/CompanyReviews/CompanyReviews";

=======
>>>>>>> 921e44ed8c6a4cfd1ce37350318fa9144096ab21


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />

        {/* Job Routes */}
        <Route path="/job-posting" element={<JobPosts />} />
        <Route path="/add-job-post" element={<AddJobPost />} />
        <Route path="/update-job/:id" element={<UpdateJob />} />

        {/* Company Routes */}
        <Route path="/CompanyRegister" element={<CompanyRegisterPage />} />
        <Route path="/Details/:id" element={<CompanyDetailsPage />} />
        <Route path="/CompanyUpdate/:id" element={<CompanyUpdatePage />} />

        {/* Application Routes */}
        <Route path="/newApplication" element={<JobApplication />} />
        <Route path="/applications" element={<ApplicationList />} />
        <Route path="/applications/:id" element={<ApplicationDetails />} />
        <Route path="/apply" element={<JobApplication />} />

<<<<<<< HEAD
        {/*reviews page route*/}
        <Route path="/company-reviews" element={<CompanyReviews />} />

        {/* Auth Route */}
        <Route path="/login" element={<CompanyLogin />} /> 
=======
        {/* Auth */}
        <Route path="/login" element={<CompanyLogin />} />
        <Route path="/verify-otp/:userId" element={<OTPVerify />} />
>>>>>>> 921e44ed8c6a4cfd1ce37350318fa9144096ab21

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
