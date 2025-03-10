import React, { useState } from "react";
import { Table, Button, Space } from "antd"; // Importing Ant Design Table and Button
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons"; // Importing icons for the buttons

const User = () => {
  // Sample user data
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Sam Johnson", email: "sam@example.com" },
    { id: 4, name: "Lucy Brown", email: "lucy@example.com" },
  ]);

  // Handle view user click (this is where you would implement viewing user details)
  const handleViewUser = (userId) => {
    console.log("View User ID:", userId);
    // Implement view user logic here
  };

  // Handle delete user click
  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
    console.log("Deleted User ID:", userId);
    // Implement delete user logic (e.g., make an API call to delete)
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
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleViewUser(record.id)}
          >
            View User
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record.id)}
          >
            Delete User
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>User Management</h2>
      <p>This is where you can manage user details.</p>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id" // Use `id` as the unique key for each row
        pagination={{ pageSize: 5 }} // Optional: Limit the number of rows per page
      />
    </div>
  );
};

export default User;
