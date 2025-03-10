import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import User from "./users"; // Placeholder for User Component
import PropertyDealer from "./propertydealer"; // Placeholder for Property Dealer Component
import Contractor from "./contractor"; // Placeholder for Contractor Component
import { LogoutOutlined } from "@ant-design/icons";
import "./dashboard.css"; // Import your custom CSS
import DashboardContent from "./dashboardcontent";

const AdminPortal = () => {
  const [activeContent, setActiveContent] = useState("Dashboard");
  const [displayText, setDisplayText] = useState(""); // State for animated text
  const navigate = useNavigate(); // Initialize useNavigate
  const username = localStorage.getItem("username");

  // Function to animate the text (typing effect)
  useEffect(() => {
    const text = `Hi, ${username}`
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + text[index]);
      index += 1;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, 100); // Adjust the speed of typing (100 ms per character)
    return () => clearInterval(interval); // Clean up the interval
  }, [username]);

  // Function to render the active content
  const renderContent = () => {
    switch (activeContent) {
      case "Dashboard":
        return <div><DashboardContent/></div>; // Placeholder for Dashboard Content
      case "User":
        return <User />; // Renders User Screen
      case "Property Dealer":
        return <PropertyDealer />; // Renders Property Dealer Screen
      case "Contractor":
        return <Contractor />; // Renders Contractor Screen
      default:
        return <div>Dashboard Content</div>; // Default Dashboard content
    }
  };

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Redirect to login page using navigate()
    navigate("/login");
  };

  return (
    <div className="admin-portal">
      {/* Sidebar */}
      <div className="sider">
        <div className="sider-header">
          <h3 style={{ fontStyle: "italic" }}>{displayText}</h3> {/* Animated text */}
        </div>
        <nav className="sider-links">
          {["Dashboard", "User", "Property Dealer", "Contractor"].map((item) => (
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
