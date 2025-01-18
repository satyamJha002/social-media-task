import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("adminToken");

  return token ? <Outlet /> : <Navigate to="/admin" />;
};

export default ProtectedRoute;
