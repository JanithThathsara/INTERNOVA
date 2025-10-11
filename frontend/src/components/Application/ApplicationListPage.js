import React from "react";
import Nav from "../Nav/Nav";  
import ApplicationList from "./ApplicationList";

const ApplicationListPage = () => {
  return (
    <>
      {/*  Nav Bar */}
      <Nav />

      <div style={{ padding: "20px" }}>
        <h2>Submitted Applications</h2>
        <ApplicationList />
      </div>
    </>
  );
};

export default ApplicationListPage;
