import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Redirect to /register if not authenticated
  if (!token) {
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default ProtectedRoute;