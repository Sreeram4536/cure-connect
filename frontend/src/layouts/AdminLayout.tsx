import React from "react";
import Navbar from "../components/admin/AdminNavbar";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Navbar />
      <div className="flex">
        <div className="w-64 min-h-screen bg-white shadow-md">
          <AdminSidebar />
        </div>
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;