import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  // Import BrowserRouter and Routes
import AdminPortal from './components/dashboard/dashboard';  // Your Admin Portal component
import Viewportfolio from "./components/dashboard/viewportfolio";

function App() {
  return (
    <Router> {/* Wrap everything inside BrowserRouter */}
      <div className="App">
        <Routes>  {/* Set up Routes */}
          {/* Route for AdminPortal page */}
          <Route path="/" element={<AdminPortal />} />
          
          {/* Route for Portfolio page */}
          <Route path="/portfolio" element={<Viewportfolio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
