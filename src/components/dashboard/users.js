import React, { useState, useEffect } from "react";
import { Table, Button, Space, Modal } from "antd"; // Importing Ant Design components
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons"; // Importing icons for the buttons
import { user } from "../../utils/axios"; // Importing axios to make API calls

const User = () => {
  // State for storing user data and modal visibility
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users from the API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await user.get("/"); // Make an API call to get user data
        console.log(response.data);  // Check the structure of the response

        // Filter users by role 'user' (this assumes the API returns a "role" field for each user)
        const filteredUsers = response.data.results.filter((user) => user.role === "user");

        setUsers(filteredUsers); // Set only 'user' role users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to fetch data only once on component mount

  // Handle view user click to open modal
  const handleViewUser = (userId) => {
    const user = users.find((user) => user.id === userId);
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  // Handle delete user click
  const handleDeleteUser = async (userId) => {
    try {
      // Make API call to delete user
      await user.delete(`/${userId}`); // Correct URL for deleting a user
      setUsers(users.filter((user) => user.id !== userId)); // Remove deleted user from state
      console.log("Deleted User ID:", userId);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Table columns definition
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",  // Assuming phone number field is named phoneNumber
      key: "phoneNumber",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleViewUser(record.id)} // Pass user id for modal
          >
            View User
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record.id)} // Pass user id for delete
          >
            Delete User
          </Button>
        </Space>
      ),
    },
  ];

  // Handle modal close
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  return (
    <div>
      <h2>User Management</h2>
      <p>This is where you can manage user details.</p>
      <Table
        columns={columns}
        dataSource={users} // Populate table with filtered user data
        rowKey="id" // Use `id` as the unique key for each row
        pagination={{ pageSize: 5 }} // Optional: Limit the number of rows per page
      />

      {/* Modal to view user details */}
      <Modal
        title="User Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null} // No footer buttons needed
      >
        {selectedUser && (
          <div>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phoneNumber}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default User;
