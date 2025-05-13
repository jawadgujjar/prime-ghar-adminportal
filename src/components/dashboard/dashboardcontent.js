import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { Fade } from "react-awesome-reveal";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { user } from "../../utils/axios";
import './dashboardcontent.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardContent = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalContractors, setTotalContractors] = useState(0);
  const [totalPropertyDealers, setTotalPropertyDealers] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await user.get("/");
        const allResults = response.data.results || [];

        const users = allResults.filter(item => item.role === "user");
        const contractors = allResults.filter(item => item.role === "contractor");
        const dealers = allResults.filter(item => item.role === "dealer");

        setTotalUsers(users.length);
        setTotalContractors(contractors.length);
        setTotalPropertyDealers(dealers.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCounts();
  }, []);

  const pieData = {
    labels: ["Users", "Contractors", "Property Dealers"],
    datasets: [
      {
        label: "Total",
        data: [totalUsers, totalContractors, totalPropertyDealers],
        backgroundColor: ["#1890ff", "#52c41a", "#fa541c"],
        borderColor: ["#e6f7ff", "#f6ffed", "#fff2e8"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#555",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <div className="dashboard-content">
      <div className="card-container">
        <Fade bottom cascade>
          <Card title="Total Users" bordered className="dashboard-card">
            <h2>{totalUsers}</h2>
          </Card>
        </Fade>

        <Fade bottom cascade delay={200}>
          <Card title="Total Contractors" bordered className="dashboard-card">
            <h2>{totalContractors}</h2>
          </Card>
        </Fade>

        <Fade bottom cascade delay={400}>
          <Card title="Total Property Dealers" bordered className="dashboard-card">
            <h2>{totalPropertyDealers}</h2>
          </Card>
        </Fade>
      </div>

      {/* Chart Section */}
      <div className="chart-section">
        <Card title="User Distribution Overview" bordered className="chart-card">
          <Pie data={pieData} options={pieOptions} />
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;
