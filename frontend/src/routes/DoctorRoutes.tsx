import { Route } from "react-router-dom";
import React from "react";

// Layout
import DoctorLayout from "../layouts/DoctorLayout";

// Doctor Pages
import DoctorLogin from "../pages/admin/AdminLogin";

const DoctorRoutes = () => {
  return (
    <>
      <Route
        path="/doctor/login"
        element={
          <DoctorLayout>
            <DoctorLogin />
          </DoctorLayout>
        }
      />
    </>
  );
};

export default DoctorRoutes;