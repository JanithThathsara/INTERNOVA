import React from "react";
import ApplicationList from "./ApplicationList";

const ApplicationListPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Submitted Applications</h2>
      <ApplicationList />
    </div>
  );
};

export default ApplicationListPage;
