import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import { contactus } from "../../utils/axios"; // You can use axios to fetch the data

const ContactUs = () => {
  // State to store the contact submissions
  const [contacts, setContacts] = useState([]);

  // Fetch contact data from API when the component mounts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // Replace with your actual API endpoint to fetch contact data
        const response = await contactus.get("/"); // Example API endpoint
        setContacts(response.data); // Assuming the data is in response.data
      } catch (error) {
        message.error("Failed to load contact data");
      }
    };

    fetchContacts(); // Fetch data on component mount
  }, []); // Empty dependency array to fetch data once on mount

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
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
  ];

  return (
    <div>
      {/* Table to display submitted contact messages */}
      <Table
        columns={columns}
        dataSource={contacts} // Data is fetched from the API
        rowKey="email" // Assuming email is unique
        pagination={{ pageSize: 5 }} // Optional: Limit the number of rows per page
      />
    </div>
  );
};

export default ContactUs;
