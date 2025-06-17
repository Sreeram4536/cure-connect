// import React from "react";
// import { assets } from "../../assets/admin/assets";
// import { NavLink } from "react-router-dom";

// const AdminSidebar = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 flex flex-col items-center py-6 px-2">
//       {/* Logo Area */}
//       <div className="mb-8 flex flex-col items-center">
//         <img src={assets.home_icon} alt="Logo" className="w-12 h-12 mb-2" />
//         <span className="text-white text-2xl font-bold tracking-wide">Admin</span>
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
//             to="/admin/dashboard"
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
//             to="/admin/user-management"
//           >
//             <img src={assets.people_icon} alt="" className="w-5 h-5" />
//             <p>Manage Users</p>
//           </NavLink>

//           <NavLink
//             className={({ isActive }) =>
//               `flex items-center gap-3 py-3.5 px-6 rounded-lg mb-2 transition-all duration-200 cursor-pointer font-medium text-base hover:bg-blue-50 hover:text-blue-700 ${
//                 isActive ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500" : ""
//               }`
//             }
//             to="/admin/appointments"
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
//             to="/admin/add-doctor"
//           >
//             <img src={assets.add_icon} alt="" className="w-5 h-5" />
//             <p>Add Doctor</p>
//           </NavLink>

//           <NavLink
//             className={({ isActive }) =>
//               `flex items-center gap-3 py-3.5 px-6 rounded-lg mb-2 transition-all duration-200 cursor-pointer font-medium text-base hover:bg-blue-50 hover:text-blue-700 ${
//                 isActive ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500" : ""
//               }`
//             }
//             to="/admin/update-doctor"
//           >
//             <img src={assets.people_icon} alt="" className="w-5 h-5" />
//             <p>Update Doctor</p>
//           </NavLink>

//           <NavLink
//             className={({ isActive }) =>
//               `flex items-center gap-3 py-3.5 px-6 rounded-lg mb-2 transition-all duration-200 cursor-pointer font-medium text-base hover:bg-blue-50 hover:text-blue-700 ${
//                 isActive ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500" : ""
//               }`
//             }
//             to="/admin/all-doctors"
//           >
//             <img src={assets.people_icon} alt="" className="w-5 h-5" />
//             <p>Doctor List</p>
//           </NavLink>

//           <NavLink
//             className={({ isActive }) =>
//               `flex items-center gap-3 py-3.5 px-6 rounded-lg mb-2 transition-all duration-200 cursor-pointer font-medium text-base hover:bg-blue-50 hover:text-blue-700 ${
//                 isActive ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500" : ""
//               }`
//             }
//             to="/admin/inbox"
//           >
//             <img src={assets.appointment_icon} alt="" className="w-5 h-5" />
//             <p>Inbox</p>
//           </NavLink>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;

import React from "react";
import { assets } from "../../assets/admin/assets";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="min-h-screen bg-slate-800 flex flex-col w-64 shadow-xl">
      {/* Logo Area */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <img src={assets.home_icon} alt="Logo" className="w-6 h-6 brightness-0 invert" />
          </div>
          <div>
            <h1 className="text-white text-lg font-semibold">Admin Panel</h1>
            <p className="text-slate-400 text-sm">Healthcare System</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 py-6">
        <nav className="space-y-1 px-4">
          <NavLink
            className={({ isActive }) =>
              `group flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`
            }
            to="/admin/dashboard"
          >
            <div className={`w-5 h-5 flex items-center justify-center`}>
              <img 
                src={assets.home_icon} 
                alt="" 
                className="w-5 h-5 brightness-0 invert opacity-80 group-hover:opacity-100" 
              />
            </div>
            <span className="font-medium">Dashboard</span>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `group flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`
            }
            to="/admin/user-management"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <img 
                src={assets.people_icon} 
                alt="" 
                className="w-5 h-5 brightness-0 invert opacity-80 group-hover:opacity-100" 
              />
            </div>
            <span className="font-medium">Manage Users</span>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `group flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`
            }
            to="/admin/appointments"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <img 
                src={assets.appointment_icon} 
                alt="" 
                className="w-5 h-5 brightness-0 invert opacity-80 group-hover:opacity-100" 
              />
            </div>
            <span className="font-medium">Appointments</span>
          </NavLink>

          {/* Doctor Management Section */}
          <div className="pt-4">
            <h3 className="text-slate-500 text-xs font-semibold uppercase tracking-wider px-4 mb-3">
              Doctor Management
            </h3>
            
            <NavLink
              className={({ isActive }) =>
                `group flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-lg" 
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`
              }
              to="/admin/add-doctor"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <img 
                  src={assets.add_icon} 
                  alt="" 
                  className="w-5 h-5 brightness-0 invert opacity-80 group-hover:opacity-100" 
                />
              </div>
              <span className="font-medium">Add Doctor</span>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `group flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-lg" 
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`
              }
              to="/admin/update-doctor"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <img 
                  src={assets.people_icon} 
                  alt="" 
                  className="w-5 h-5 brightness-0 invert opacity-80 group-hover:opacity-100" 
                />
              </div>
              <span className="font-medium">Update Doctor</span>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `group flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-lg" 
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`
              }
              to="/admin/all-doctors"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <img 
                  src={assets.people_icon} 
                  alt="" 
                  className="w-5 h-5 brightness-0 invert opacity-80 group-hover:opacity-100" 
                />
              </div>
              <span className="font-medium">Doctor List</span>
            </NavLink>
          </div>

          <NavLink
            className={({ isActive }) =>
              `group flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`
            }
            to="/admin/inbox"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <img 
                src={assets.appointment_icon} 
                alt="" 
                className="w-5 h-5 brightness-0 invert opacity-80 group-hover:opacity-100" 
              />
            </div>
            <span className="font-medium">Inbox</span>
            <div className="ml-auto">
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>
            </div>
          </NavLink>
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 text-slate-400">
          <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold text-white">A</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-300">Admin User</p>
            <p className="text-xs text-slate-500">System Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;