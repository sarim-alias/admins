import React from "react";
import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./Auth/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";

// Function to check authentication
const isAuthenticated = () => !!localStorage.getItem("jwt");

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

function App() {
  const location = useLocation(); // Get current route

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br bg-gray-900">
      {/* Show Navbar only if the path is NOT "/login" */}
      {location.pathname !== "/login" && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      </Routes>
    </div>
  );
}

export default App;
