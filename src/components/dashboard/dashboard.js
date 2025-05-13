import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "./users";
import PropertyDealer from "./propertydealer";
import Contractor from "./contractor";
import { LogoutOutlined } from "@ant-design/icons";
import "./dashboard.css";
import DashboardContent from "./dashboardcontent";
import ContactUs from "./contactus";

const AdminPortal = () => {
  const [activeContent, setActiveContent] = useState("Dashboard");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeContent) {
      case "Dashboard":
        return (
          <div>
            <DashboardContent />
          </div>
        );
      case "User":
        return <User />;
      case "Property Dealer":
        return <PropertyDealer />;
      case "Contractor":
        return <Contractor />;
      case "Contact Us":
        return <ContactUs />;
      default:
        return <div>Dashboard Content</div>;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-portal">
      {/* Sidebar */}
      <div className="sider">
        <div className="sider-header">
          <h3 style={{ fontStyle: "italic", fontWeight:"bold" }}>Welcome to Prime Ghar Admin Portal</h3> {/* <- Yahan text daal diya */}
        </div>
        <nav className="sider-links">
          {["Dashboard", "User", "Property Dealer", "Contractor", "Contact Us"].map((item) => (
            <a
              key={item}
              className={activeContent === item ? "active" : ""}
              onClick={() => setActiveContent(item)}
            >
              {item}
            </a>
          ))}
          <button className="logout-btn" onClick={handleLogout}>
            <LogoutOutlined /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1 className="content-heading">{activeContent}</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPortal;
