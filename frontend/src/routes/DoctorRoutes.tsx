import { Route } from "react-router-dom";
import React from "react";

// Layout
import DoctorLayout from "../layouts/DoctorLayout";

// Doctor Pages
import DoctorLogin from "../pages/doctor/DoctorLogin";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";

const DoctorRoutes = () => {
  return (
    <>
      <Route
        path="/doctor/login"
        element={
          
            <DoctorLogin />
          
        }
      />
      <Route
        path="/doctor/dashboard"
        element={
          <DoctorLayout>
            <DoctorDashboard />
          </DoctorLayout>
        }
      />
    </>
  );
};

export default DoctorRoutes;