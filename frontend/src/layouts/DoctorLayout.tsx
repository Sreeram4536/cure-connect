// import React from "react";
// import Navbar from "../components/doctor/DoctorNavbar";
// import Footer from "../components/users/Footer";

// const DoctorLayout = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div className="mx-4 sm:mx=[10%]">
//       <Navbar />
//       {children}
//       <Footer />
//     </div>
//   );
// };

// export default DoctorLayout;

// import React from "react";
// import DoctorSidebar from "../components/doctor/DoctorSidebar";
// import DoctorNavbar from "../components/doctor/DoctorNavbar";

// const DoctorLayout = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div className="mx-4 sm:mx=[10%]">
//       <DoctorNavbar />
//       <div className="flex">
//         <DoctorSidebar />
//         <div className="flex-1">{children}</div>
//       </div>
//     </div>
//   );
// };

// export default DoctorLayout;

// frontend/src/layouts/DoctorLayout.tsx
import React from "react";
import DoctorSidebar from "../components/doctor/DoctorSidebar";
import DoctorNavbar from "../components/doctor/DoctorNavbar";

const DoctorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <DoctorSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DoctorNavbar />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;