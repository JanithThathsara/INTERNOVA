import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./components/Home/Home";

import JobPosts from './components/JobPost/JobPosts';
import AddJobPost from "./components/JobPost/AddJobPost";
import UpdateJob from "./components/JobPost/UpdateJob";
//company regidter root

import CompanyRegisterPage from './components/CompanyhomePage/CompanyHome';
import CompanyDetailsPage from './components/CompanyDetailPage/CompanyDetails';
import CompanyUpdatePage from './components/CompanyUpdatePage/CompanyUpdate';

function App() {

  return (
    <div >
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/job-posting" element={<JobPosts />} />
          <Route path="/add-job-post" element={<AddJobPost />} />
          <Route path="/update-job/:id" element={<UpdateJob />} />
          {/* Add other routes here */}
        <Route path="/CompanyRegister" element={<CompanyRegisterPage />} />
        <Route path="/Details/:id" element={<CompanyDetailsPage />} />
        <Route path="/CompanyUpdate/:id" element={<CompanyUpdatePage />} />
        </Routes>
      </React.Fragment>

    </div>
  );
}

export default App;
