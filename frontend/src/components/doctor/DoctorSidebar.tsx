
// import React from "react";
// import { assets } from "../../assets/assets";
// import { NavLink } from "react-router-dom";

// const DoctorSidebar = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 flex flex-col items-center py-6 px-2">
//       {/* Logo Area */}
//       <div className="mb-8 flex flex-col items-center">
//         <img src={assets.mylogo} alt="Logo" className="w-12 h-12 mb-2" />
//         <span className="text-white text-2xl font-bold tracking-wide">Doctor</span>
//         <span className="text-blue-200 text-xs font-light">Dashboard</span>
//       </div>
//       {/* Sidebar Card */}
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-[260px] flex-1 flex flex-col py-6 px-2">
//         <ul className="text-[#515151]">
//           <NavLink
//             className={({ isActive }) =>
//               `flex items-center gap-3 py-3.5 px-6 rounded-lg mb-2 transition-all duration-200 cursor-pointer font-medium text-base hover:bg-blue-50 hover:text-blue-700 ${
//                 isActive ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500" : ""
//               }`
//             }
//             to="/doctor/dashboard"
//           >
//             <img src={assets.home_icon} alt="" className="w-5 h-5" />
//             <p>Dashboard</p>
//           </NavLink>

//           <NavLink
//             className={({ isActive }) =>
//               `flex items-center gap-3 py-3.5 px-6 rounded-lg mb-2 transition-all duration-200 cursor-pointer font-medium text-base hover:bg-blue-50 hover:text-blue-700 ${
//                 isActive ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500" : ""
//               }`
//             }
//             to="/doctor/slots"
//           >
//             <img src={assets.appointment_icon} alt="" className="w-5 h-5" />
//             <p>Slot Management</p>
//           </NavLink>

//           <NavLink
//             className={({ isActive }) =>
//               `flex items-center gap-3 py-3.5 px-6 rounded-lg mb-2 transition-all duration-200 cursor-pointer font-medium text-base hover:bg-blue-50 hover:text-blue-700 ${
//                 isActive ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500" : ""
//               }`
//             }
//             to="/doctor/appointments"
//           >
//             <img src={assets.appointment_icon} alt="" className="w-5 h-5" />
//             <p>Appointments</p>
//           </NavLink>

//           <NavLink
//             className={({ isActive }) =>
//               `flex items-center gap-3 py-3.5 px-6 rounded-lg mb-2 transition-all duration-200 cursor-pointer font-medium text-base hover:bg-blue-50 hover:text-blue-700 ${
//                 isActive ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500" : ""
//               }`
//             }
//             to="/doctor/profile"
//           >
//             <img src={assets.profile_pic} alt="" className="w-5 h-5 rounded-full" />
//             <p>Profile</p>
//           </NavLink>

//           <NavLink
//             className={({ isActive }) =>
//               `flex items-center gap-3 py-3.5 px-6 rounded-lg mb-2 transition-all duration-200 cursor-pointer font-medium text-base hover:bg-blue-50 hover:text-blue-700 ${
//                 isActive ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500" : ""
//               }`
//             }
//             to="/doctor/logout"
//           >
//             <img src={assets.cross_icon} alt="" className="w-5 h-5" />
//             <p>Logout</p>
//           </NavLink>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default DoctorSidebar;

// frontend/src/components/doctor/DoctorSidebar.tsx
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { DoctorContext } from "../../context/DoctorContext";
import { 
  HomeIcon, 
  CalendarIcon, 
  UserGroupIcon, 
  UserIcon, 
  ArrowRightOnRectangleIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

const DoctorSidebar = () => {
  const context = useContext(DoctorContext);
  const { doctorData } = context || {};

  const navigation = [
    {
      name: "Dashboard",
      href: "/doctor/dashboard",
      icon: HomeIcon,
      current: true,
    },
    {
      name: "Slot Management",
      href: "/doctor/slots",
      icon: ClockIcon,
      current: false,
    },
    {
      name: "Appointments",
      href: "/doctor/appointments",
      icon: CalendarIcon,
      current: false,
    },
    {
      name: "Profile",
      href: "/doctor/profile",
      icon: UserIcon,
      current: false,
    },
  ];

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        {/* Sidebar component */}
        <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
          {/* Logo */}
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-white text-lg font-semibold">Doctor Portal</h1>
              </div>
            </div>
          </div>

          {/* Doctor Info */}
          {doctorData && (
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src={doctorData.image}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{doctorData.name}</p>
                  <p className="text-xs text-gray-500">{doctorData.speciality}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      isActive
                        ? "bg-indigo-100 text-indigo-700 border-r-2 border-indigo-500"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                >
                  <item.icon
                    className="mr-3 flex-shrink-0 h-6 w-6"
                    aria-hidden="true"
                  />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Logout */}
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <NavLink
              to="/doctor/logout"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 w-full"
            >
              <ArrowRightOnRectangleIcon
                className="mr-3 flex-shrink-0 h-6 w-6"
                aria-hidden="true"
              />
              Logout
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSidebar;