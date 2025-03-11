import React, { useState, useEffect } from "react";
import { Table, Button, Space, Modal, Card } from "antd"; // Importing Ant Design components
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons"; // Importing icons for the buttons
import { user } from "../../utils/axios"; // Adjust this import to your axios setup

const Contractor = () => {
  // State for storing contractor data, modal visibility, selected contractor, and portfolio visibility
  const [contractors, setContractors] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [isPortfolioModalVisible, setIsPortfolioModalVisible] = useState(false);

  // Fetch contractors from the API when the component mounts
  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const response = await user.get("/"); // Get the data from the API
        console.log(response.data); // Check the structure of the response

        // Assuming your API returns a "results" array with various users and roles
        // Filter the data to get only the users where the role is "contractor"
        const filteredContractors = response.data.results.filter(
          (item) => item.role === "contractor"
        );

        setContractors(filteredContractors); // Set the filtered contractors data
      } catch (error) {
        console.error("Error fetching contractors:", error);
      }
    };

    fetchContractors();
  }, []); // Empty dependency array to fetch data only once on component mount

  // Handle view contractor click to open modal
  const handleViewContractor = (contractorId) => {
    const contractor = contractors.find((contractor) => contractor.id === contractorId);
    setSelectedContractor(contractor);
    setIsModalVisible(true);
  };

  // Handle delete contractor click
  const handleDeleteContractor = async (contractorId) => {
    try {
      // Make API call to delete contractor (update the URL as per your backend setup)
      await user.delete(`/${contractorId}`); // API call to delete contractor
      setContractors(contractors.filter((contractor) => contractor.id !== contractorId)); // Remove deleted contractor from state
      console.log("Deleted Contractor ID:", contractorId);
    } catch (error) {
      console.error("Error deleting contractor:", error);
    }
  };

  // Handle the portfolio modal open/close
  const handlePortfolioModalClose = () => {
    setIsPortfolioModalVisible(false);
  };

  const handleViewPortfolio = () => {
    setIsPortfolioModalVisible(true); // Open the portfolio modal
  };

  // Table columns definition
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
            onClick={() => handleViewContractor(record.id)} // Pass contractor id for modal
          >
            View Portfolio
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteContractor(record.id)} // Pass contractor id for delete
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Handle modal close
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedContractor(null);
  };

  return (
    <div>
      <h2>Contractor Management</h2>
      <p>This is where you can manage contractors and their portfolios.</p>

      {/* Table to display contractors */}
      <Table
        columns={columns}
        dataSource={contractors} // Populate table with contractor data
        rowKey="id" // Use `id` as the unique key for each row
        pagination={{ pageSize: 5 }} // Optional: Limit the number of rows per page
      />

      {/* Modal to view contractor details */}
      <Modal
        title="Contractor Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null} // No footer buttons needed
      >
        {selectedContractor && (
          <div>
            <p>
              <strong>Name:</strong> {selectedContractor.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedContractor.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedContractor.phoneNumber}
            </p>
            <p>
              <strong>Agency Name:</strong> {selectedContractor.agencyName}
            </p>
            <p>
              <strong>Agency NTN Number:</strong> {selectedContractor.agencyNtnNumber}
            </p>
            <p>
              <strong>Agency Address:</strong>{" "}
              {selectedContractor.agencyAddress &&
                selectedContractor.agencyAddress
                  .map(
                    (address) =>
                      `${address.street}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.country}`
                  )
                  .join(" | ")}
            </p>

            {/* View Portfolio button */}
            <Button type="primary" onClick={handleViewPortfolio}>
              View Portfolio
            </Button>
          </div>
        )}
      </Modal>

      {/* Portfolio Modal to display portfolio */}
      <Modal
        title="Contractor Portfolio"
        visible={isPortfolioModalVisible}
        onCancel={handlePortfolioModalClose}
        footer={null}
        width={800}
      >
        {selectedContractor && selectedContractor.portfolio && (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {selectedContractor.portfolio.map((item) => (
              <Card
                key={item.id}
                title={item.name}
                style={{ width: 240, margin: "10px" }}
                cover={<img alt="portfolio" src={item.imageUrl} />}
              >
                <p>{item.description}</p>
                <p>Price: ${item.price}</p>
              </Card>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Contractor;
