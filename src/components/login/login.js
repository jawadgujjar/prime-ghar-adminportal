import React, { useState } from "react";
import { Button, Input, Form, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../utils/axios";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");   
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    setErrorMessage("");  // Reset previous error
    try {
      const response = await login.post("/login", values);
      console.log("Login Successful:", response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.user.name);

      message.success("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error("Login Failed:", error.response?.data || error.message);
      setErrorMessage("Invalid email or password. Please enter correct information.");  // 👈 Set error message
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "black",
      }}
    >
      <Form
        onFinish={handleLogin}
        style={{
          width: 300,
          padding: 20,
          borderRadius: 10,
          background: "#1a1a1a",
          boxShadow: "0px 4px 10px rgba(255, 255, 0, 0.5)",
        }}
      >
        <h2 style={{ color: "yellow", textAlign: "center" }}>Login</h2>

        {/* Show error message inside the form */}
        {errorMessage && (
          <div style={{ color: "red", marginBottom: 10, textAlign: "center" }}>
            {errorMessage}
          </div>
        )}

        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input
            placeholder="Email"
            style={{ background: "#333", color: "white" }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password
            placeholder="Password"
            style={{ background: "#333", color: "white" }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%", background: "yellow", color: "black" }}
          >
            Login
          </Button>
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <span style={{ color: "white" }}>Don't have an account? </span>
          <Link to="/signup" style={{ color: "yellow", fontWeight: "bold" }}>
            Signup with us
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
