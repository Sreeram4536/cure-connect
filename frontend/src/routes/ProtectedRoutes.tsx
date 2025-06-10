import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext"; 

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const context = useContext(AppContext);

  if (!context) return <Navigate to="/" replace />;

  const { token } = context;

  // If no token, redirect to landing page
  if (!token) {
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
