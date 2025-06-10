import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets"; // Adjust path as needed for your doctor icons

const DoctorSidebar = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 flex flex-col items-center py-6 px-2">
      {/* Logo Area */}
      <div className="mb-8 flex flex-col items-center">
        <img src={assets.mylogo || assets.profile_pic} alt="Logo" className="w-12 h-12 mb-2" />
        <span className="text-white text-2xl font-bold tracking-wide">Doctor</span>
        <span className="text-blue-200 text-xs font-light">Dashboard</span>
      </div>
      {/* Sidebar Card */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-[260px] flex-1 flex flex-col py-6 px-2">
        <ul className="text-[#515151]">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 rounded-lg mb-2 transition-all duration-200 cursor-pointer font-medium text-base hover:bg-blue-50 hover:text-blue-700 ${
                isActive ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500" : ""
              }`
            }
            to="/doctor/dashboard"
          >
            <img src={assets.home_icon} alt="" className="w-5 h-5" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 rounded-lg mb-2 transition-all duration-200 cursor-pointer font-medium text-base hover:bg-blue-50 hover:text-blue-700 ${
                isActive ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500" : ""
              }`
            }
            to="/doctor/appointments"
          >
            <img src={assets.appointment_icon || assets.home_icon} alt="" className="w-5 h-5" />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 rounded-lg mb-2 transition-all duration-200 cursor-pointer font-medium text-base hover:bg-blue-50 hover:text-blue-700 ${
                isActive ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500" : ""
              }`
            }
            to="/doctor/patients"
          >
            <img src={assets.people_icon || assets.home_icon} alt="" className="w-5 h-5" />
            <p>Patients</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 rounded-lg mb-2 transition-all duration-200 cursor-pointer font-medium text-base hover:bg-blue-50 hover:text-blue-700 ${
                isActive ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500" : ""
              }`
            }
            to="/doctor/wallet"
          >
            <img src={assets.wallet_icon || assets.home_icon} alt="" className="w-5 h-5" />
            <p>Wallet</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 rounded-lg mb-2 transition-all duration-200 cursor-pointer font-medium text-base hover:bg-blue-50 hover:text-blue-700 ${
                isActive ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500" : ""
              }`
            }
            to="/doctor/messages"
          >
            <img src={assets.appointment_icon || assets.home_icon} alt="" className="w-5 h-5" />
            <p>Messages</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 rounded-lg mb-2 transition-all duration-200 cursor-pointer font-medium text-base hover:bg-blue-50 hover:text-blue-700 ${
                isActive ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500" : ""
              }`
            }
            to="/doctor/profile"
          >
            <img src={assets.profile_pic || assets.home_icon} alt="" className="w-5 h-5 rounded-full" />
            <p>Profile</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 rounded-lg mb-2 transition-all duration-200 cursor-pointer font-medium text-base hover:bg-blue-50 hover:text-blue-700 ${
                isActive ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500" : ""
              }`
            }
            to="/doctor/logout"
          >
            <img src={assets.cross_icon || assets.home_icon} alt="" className="w-5 h-5" />
            <p>Logout</p>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default DoctorSidebar; 