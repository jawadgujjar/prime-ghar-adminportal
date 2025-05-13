import React, { useState, useEffect } from "react";
import { Table, Button, Space, Modal, Card } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { property, user } from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const Contractor = () => {
  const [contractors, setContractors] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [isPortfolioModalVisible, setIsPortfolioModalVisible] = useState(false);
  const [portfolioProperties, setPortfolioProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const response = await user.get("/");
        const filteredContractors = response.data.results.filter(
          (item) => item.role === "contractor"
        );
        setContractors(filteredContractors);
      } catch (error) {
        console.error("Error fetching contractors:", error);
      }
    };

    fetchContractors();
  }, []);

  const handleViewContractor = (contractorId) => {
    const contractor = contractors.find((c) => c.id === contractorId);
    setSelectedContractor(contractor);
    setIsModalVisible(true);
  };

  const handleDeleteContractor = async (contractorId) => {
    try {
      await user.delete(`/${contractorId}`);
      setContractors(contractors.filter((c) => c.id !== contractorId));
    } catch (error) {
      console.error("Error deleting contractor:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedContractor(null);
  };

  const handlePortfolioModalClose = () => {
    setIsPortfolioModalVisible(false);
    setPortfolioProperties([]);
  };

  const handlePortfolioView = async () => {
    if (selectedContractor && selectedContractor.id) {
      try {
        const response = await property.get(`/user/${selectedContractor.id}`);
        console.log("Portfolio response:", response.data);
  
        // Try different fallbacks in case results isn't present
        const results =
          Array.isArray(response.data.results)
            ? response.data.results
            : Array.isArray(response.data)
            ? response.data
            : [];
  
        setPortfolioProperties(results);
        setIsPortfolioModalVisible(true);
      } catch (error) {
        console.error("Error fetching portfolio properties:", error);
      }
    }
  };
  

  const columns = [
    {
      title: "Contractor Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phone",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleViewContractor(record.id)}
          >
            View Details
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteContractor(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Contractor Management</h2>
      <p>This is where you can manage contractors and their portfolios.</p>

      <Table
        columns={columns}
        dataSource={contractors}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      {/* Contractor Details Modal */}
      <Modal
        title="Contractor Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedContractor && (
          <div>
            <p><strong>Name:</strong> {selectedContractor.name}</p>
            <p><strong>Email:</strong> {selectedContractor.email}</p>
            <p><strong>Phone:</strong> {selectedContractor.phoneNumber}</p>
            <p><strong>Agency Name:</strong> {selectedContractor.agencyName}</p>
            <p>
              <strong>Agency NTN Number:</strong> {selectedContractor.agencyNtnNumber}
            </p>
            <p>
              <strong>Agency Address:</strong> {selectedContractor.agencyAddress &&
                selectedContractor.agencyAddress
                  .map(
                    (address) =>
                      `${address.street}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.country}`
                  )
                  .join(" | ")}
            </p>

            <Button type="primary" onClick={handlePortfolioView}>
              View Portfolio Properties
            </Button>
          </div>
        )}
      </Modal>

      {/* Portfolio Properties Modal */}
      <Modal
  title="Portfolio Properties"
  visible={isPortfolioModalVisible}
  onCancel={handlePortfolioModalClose}
  footer={null}
  width={900}
>
  {portfolioProperties?.length > 0 ? (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {portfolioProperties.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          style={{ width: 250 }}
          cover={
            <img
              alt={item.title}
              src={item.images?.[0] || "/placeholder.jpg"}
              style={{ height: 150, objectFit: "cover" }}
            />
          }
        >
          <p><strong>Price:</strong> ${item.price}</p>
          <p>
            <strong>Location:</strong>{" "}
            {item.location?.city}, {item.location?.address}
          </p>
          <p>
            <strong>Area:</strong>{" "}
            {item.location?.area} {item.location?.unit}
          </p>
          {/* <p><strong>Bedrooms:</strong> {item.features?.bedrooms}</p>
          <p><strong>Bathrooms:</strong> {item.features?.bathrooms}</p> */}
          <p><strong>Floors:</strong> {item.features?.floors}</p>
          {/* <p><strong>Garage:</strong> {item.features?.garage ? "Yes" : "No"}</p> */}
        </Card>
      ))}
    </div>
  ) : (
    <p>No portfolio properties foundss.</p>
  )}
</Modal>

    </div>
  );
};

export default Contractor;
