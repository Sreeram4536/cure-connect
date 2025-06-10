import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("dToken");
    if (!token) {
      navigate("/doctor/login");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Doctor Dashboard</h1>
      <p>Welcome to the doctor dashboard!</p>
    </div>
  );
};

export default DoctorDashboard;
