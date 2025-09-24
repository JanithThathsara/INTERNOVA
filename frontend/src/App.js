import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import JobPosts from './components/JobPost/JobPosts';
import AddJobPost from "./components/JobPost/AddJobPost";
import UpdateJob from "./components/JobPost/UpdateJob";


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
        </Routes>
      </React.Fragment>

    </div>
  );
}

export default App;
