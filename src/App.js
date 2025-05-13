import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPortal from './components/dashboard/dashboard';
import Viewportfolio from "./components/dashboard/viewportfolio";
import Login from "./components/login/login";
import Signup from "./components/login/signup";
import ProtectedRoute from "./components/protectedroute/protectedroute"; // Import protected route wrapper

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminPortal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portfolio"
            element={
              <ProtectedRoute>
                <Viewportfolio />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
