import React, { useState, useEffect } from "react";
import { Table, Button, Space, Modal, Card, message } from "antd"; // Importing Ant Design components
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons"; // Importing icons for the buttons
import { user, property } from "../../utils/axios"; // Adjust this import to your axios setup

const PropertyDealer = () => {
  const [dealers, setDealers] = useState([]); // Dealer data
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility for dealer details
  const [portfolioProperties, setPortfolioProperties] = useState([]);
  const [isPortfolioModalVisible, setIsPortfolioModalVisible] = useState(false);
  
  const [selectedDealer, setSelectedDealer] = useState(null); // Selected dealer details
  const [isPropertiesModalVisible, setIsPropertiesModalVisible] =
    useState(false); // Modal visibility for properties
  const [selectedProperty, setSelectedProperty] = useState(null); // Selected property details
  const [properties, setProperties] = useState([]); // Properties data for a specific dealer

  // Fetch dealers from the API when the component mounts
  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const response = await user.get("/"); // Get the data from the API
        console.log(response.data); // Check the structure of the response

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

  // Fetch properties for a selected dealer by user ID
  // const fetchProperties = async (dealerId) => {
  //   try {
  //     const response = await property.get(`/user/${dealerId}`); // Get properties for the selected dealer
  //     console.log(response.data); // Check the structure of the response

  //     // Check if the response data is an empty array
  //     if (Array.isArray(response.data) && response.data.length === 0) {
  //       message.info("No properties listed for this dealer."); // Show the info toast message
  //       setProperties([]); // Clear properties
  //       setIsPropertiesModalVisible(false); // Close the modal if no properties are available
  //     } else {
  //       setProperties(response.data); // Set the properties data for the selected dealer
  //       setIsPropertiesModalVisible(true); // Open the modal to view properties
  //     }
  //   } catch (error) {
  //     message.error("Failed to fetch properties."); // Show error message if API call fails
  //     console.error("Error fetching properties:", error);
  //   }
  // };
  const handlePortfolioView = async () => {
    if (selectedDealer && selectedDealer.id) {
      try {
        const response = await property.get(`/user/${selectedDealer.id}`);
        console.log("Portfolio dealer response:", response.data);
  
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

  // Handle view dealer click to open modal
const handleViewDealer = async (dealerId) => {
  const dealer = dealers.find((dealer) => dealer.id === dealerId);
  if (dealer) {
    try {
      const response = await property.get(`/user/${dealerId}`);
      const propertyList = Array.isArray(response.data.results)
        ? response.data.results
        : Array.isArray(response.data)
        ? response.data
        : [];

      // Add totalListings to the dealer
      const dealerWithListings = { ...dealer, totalListings: propertyList.length };

      setSelectedDealer(dealerWithListings);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error fetching dealer properties:", error);
      message.error("Failed to fetch dealer properties.");
    }
  }
};


  // Handle delete dealer click
  const handleDeleteDealer = async (dealerId) => {
    try {
      // Make API call to delete dealer
      await user.delete(`/${dealerId}`);
      setDealers(dealers.filter((dealer) => dealer.id !== dealerId)); // Remove deleted dealer from state
      console.log("Deleted Dealer ID:", dealerId);
    } catch (error) {
      console.error("Error deleting dealer:", error);
    }
  };

  // Handle properties modal close
  const handlePropertiesModalClose = () => {
    setIsPropertiesModalVisible(false); // Close the modal
    setSelectedProperty(null); // Clear selected property
    setProperties([]); // Clear properties when modal is closed
  };

  // Handle property card click to view property details
  const handleViewProperty = (propertyId) => {
    const property = properties.find((property) => property.id === propertyId);
    setSelectedProperty(property);
  };
  const handlePortfolioModalClose = () => {
    setIsPortfolioModalVisible(false);
    setPortfolioProperties([]);
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
            {/* <p>
              <strong>Reviews:</strong> {selectedDealer.reviews}
            </p>
            <p>
              <strong>Rating:</strong> {selectedDealer.rating}
            </p> */}
            <Button type="primary" onClick={handlePortfolioView}>
              View dealer Properties
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
        {properties && properties.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {properties.map((property) => (
              <Card
                key={property.id}
                title={property.name}
                style={{ width: 240, margin: "10px" }}
                cover={<img alt="property" src={property.imageUrl} />}
                onClick={() => handleViewProperty(property.id)} // Open property detail modal
              >
                <p>
                  <strong>Location:</strong> {property.location.city},{" "}
                  {property.location.address}
                </p>
                <p>
                  <strong>Area:</strong> {property.location.area}{" "}
                  {property.location.unit}
                </p>
                <p>
                  <strong>Price:</strong> ${property.price}
                </p>
              </Card>
            ))}
          </div>
        ) : (
          <p>No properties found for this dealer.</p>
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
            <p>
              <strong>Property Name:</strong> {selectedProperty.name}
            </p>
            <p>
              <strong>Location:</strong> {selectedProperty.location.city},{" "}
              {selectedProperty.location.address}
            </p>
            <p>
              <strong>Area:</strong> {selectedProperty.location.area}{" "}
              {selectedProperty.location.unit}
            </p>
            <p>
              <strong>Price:</strong> ${selectedProperty.price}
            </p>
            <p>
              <strong>Description:</strong> {selectedProperty.description}
            </p>
            <p>
              <strong>Reviews:</strong> {selectedProperty.reviews}
            </p>
            <p>
              <strong>Rating:</strong> {selectedProperty.rating}
            </p>
            <img
              alt="property"
              src={selectedProperty.imageUrl}
              style={{ width: "100%" }}
            />
          </div>
        )}
      </Modal>

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
          <p>No portfolio properties foundsssssss.</p>
        )}
      </Modal>
    </div>
  );
};

export default PropertyDealer;
