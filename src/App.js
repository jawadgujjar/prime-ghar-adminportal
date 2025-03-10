import React from "react";
import { BrowserRouter as Router } from "react-router-dom";  // Import BrowserRouter
import AdminPortal from './components/dashboard/dashboard';  // Your Admin Portal component

function App() {
  return (
    <Router> {/* Wrap everything inside BrowserRouter */}
      <div className="App">
        <AdminPortal /> {/* Your Admin Portal component */}
      </div>
    </Router>
  );
}

export default App;
