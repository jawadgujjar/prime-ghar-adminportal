import React, { useState, useEffect } from "react";
import { Table, Button, Space, Modal, Card } from "antd"; // Importing Ant Design components
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons"; // Importing icons for the buttons
import { user } from "../../utils/axios"; // Adjust this import to your axios setup

const PropertyDealer = () => {
  // State for storing property dealer data, modal visibility, selected dealer, and properties
  const [dealers, setDealers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [isPropertiesModalVisible, setIsPropertiesModalVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Fetch dealers from the API when the component mounts
  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const response = await user.get("/"); // Get the data from the API
        console.log(response.data); // Check the structure of the response

        // Assuming your API returns a "results" array with various users and roles
        // Filter the data to get only the users where the role is "dealer"
        const filteredDealers = response.data.results.filter(
          (item) => item.role === "dealer"
        );

        setDealers(filteredDealers); // Set the filtered dealers data
      } catch (error) {
        console.error("Error fetching dealers:", error);
      }
    };

    fetchDealers();
  }, []); // Empty dependency array to fetch data only once on component mount

  // Handle view dealer click to open modal
  const handleViewDealer = (dealerId) => {
    const dealer = dealers.find((dealer) => dealer.id === dealerId);
    setSelectedDealer(dealer);
    setIsModalVisible(true);
  };

  // Handle delete dealer click
  const handleDeleteDealer = async (dealerId) => {
    try {
      // Make API call to delete dealer (update the URL as per your backend setup)
      await user.delete(`/${dealerId}`); // API call to delete dealer
      setDealers(dealers.filter((dealer) => dealer.id !== dealerId)); // Remove deleted dealer from state
      console.log("Deleted Dealer ID:", dealerId);
    } catch (error) {
      console.error("Error deleting dealer:", error);
    }
  };

  // Handle the properties modal close
  const handlePropertiesModalClose = () => {
    setIsPropertiesModalVisible(false);
    setSelectedProperty(null);
  };

  // Handle property card click to view property details
  const handleViewProperty = (propertyId) => {
    const property = selectedDealer.properties.find(
      (property) => property.id === propertyId
    );
    setSelectedProperty(property);
    setIsPropertiesModalVisible(true);
  };

  // Table columns definition
  const columns = [
    {
      title: "Dealer Name",
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
            onClick={() => handleViewDealer(record.id)} // Pass dealer id for modal
          >
            View
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteDealer(record.id)} // Pass dealer id for delete
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
    setSelectedDealer(null);
  };

  return (
    <div>
      <h2>Property Dealer Management</h2>
      <p>This is where you can manage property dealers and their listings.</p>

      {/* Table to display property dealers */}
      <Table
        columns={columns}
        dataSource={dealers} // Populate table with dealer data
        rowKey="id" // Use `id` as the unique key for each row
        pagination={{ pageSize: 5 }} // Optional: Limit the number of rows per page
      />

      {/* Modal to view property dealer details */}
      <Modal
        title="Property Dealer Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null} // No footer buttons needed
      >
        {selectedDealer && (
          <div>
            <p>
              <strong>Name:</strong> {selectedDealer.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedDealer.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedDealer.phoneNumber}
            </p>
            <p>
              <strong>Total Listed Properties:</strong>{" "}
              {selectedDealer.totalListings}
            </p>
            <p>
              <strong>Reviews:</strong> {selectedDealer.reviews}
            </p>
            <p>
              <strong>Rating:</strong> {selectedDealer.rating}
            </p>
            <Button
              type="primary"
              onClick={() => setIsPropertiesModalVisible(true)}
            >
              View Properties
            </Button>
          </div>
        )}
      </Modal>

      {/* Modal to display properties as cards */}
      <Modal
        title="Properties Listed"
        visible={isPropertiesModalVisible}
        onCancel={handlePropertiesModalClose}
        footer={null}
        width={800}
      >
        {selectedDealer && selectedDealer.properties && (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {selectedDealer.properties.map((property) => (
              <Card
                key={property.id}
                title={property.name}
                style={{ width: 240, margin: "10px" }}
                cover={<img alt="property" src={property.imageUrl} />}
                onClick={() => handleViewProperty(property.id)} // Open property detail modal
              >
                <p>{property.location}</p>
                <p>Price: ${property.price}</p>
              </Card>
            ))}
          </div>
        )}
      </Modal>

      {/* Modal to view detailed property */}
      <Modal
        title="Property Details"
        visible={selectedProperty !== null}
        onCancel={handlePropertiesModalClose}
        footer={null}
      >
        {selectedProperty && (
          <div>
            <p><strong>Property Name:</strong> {selectedProperty.name}</p>
            <p><strong>Location:</strong> {selectedProperty.location}</p>
            <p><strong>Price:</strong> ${selectedProperty.price}</p>
            <p><strong>Description:</strong> {selectedProperty.description}</p>
            <p><strong>Reviews:</strong> {selectedProperty.reviews}</p>
            <p><strong>Rating:</strong> {selectedProperty.rating}</p>
            <img alt="property" src={selectedProperty.imageUrl} style={{ width: "100%" }} />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PropertyDealer;
