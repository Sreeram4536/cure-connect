import React from "react";
import Navbar from "../components/users/Navbar";
import Footer from "../components/users/Footer";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default UserLayout;