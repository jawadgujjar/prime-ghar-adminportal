import React, { useState, useEffect } from "react";
import { Card } from "antd"; // Importing Ant Design Card for styling
import { Fade } from "react-awesome-reveal"; // Importing react-awesome-reveal Fade for animation
import './dashboardcontent.css'; // Import custom CSS for styling

const DashboardContent = () => {
  // For now, we'll use static data to represent total counts
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalContractors, setTotalContractors] = useState(0);
  const [totalPropertyDealers, setTotalPropertyDealers] = useState(0);

  // Simulating API call (you can replace this with actual API calls)
  useEffect(() => {
    // Simulating a fetch operation
    setTotalUsers(120); // Example count for Users
    setTotalContractors(45); // Example count for Contractors
    setTotalPropertyDealers(30); // Example count for Property Dealers
  }, []);

  return (
    <div className="dashboard-content">
      <div className="card-container">
        {/* User Card */}
        <Fade bottom cascade>
          <Card
            title="Total Users"
            bordered={true}
            className="dashboard-card"
          >
            <h2>{totalUsers}</h2>
          </Card>
        </Fade>

        {/* Contractor Card */}
        <Fade bottom cascade delay={200}>
          <Card
            title="Total Contractors"
            bordered={true}
            className="dashboard-card"
          >
            <h2>{totalContractors}</h2>
          </Card>
        </Fade>

        {/* Property Dealer Card */}
        <Fade bottom cascade delay={400}>
          <Card
            title="Total Property Dealers"
            bordered={true}
            className="dashboard-card"
          >
            <h2>{totalPropertyDealers}</h2>
          </Card>
        </Fade>
      </div>
    </div>
  );
};

export default DashboardContent;
