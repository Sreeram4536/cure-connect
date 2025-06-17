// import React, { useState, useEffect } from "react";
// import { assets } from "../../assets/assets";
// import { NavLink, useNavigate } from "react-router-dom";

// const DoctorNavbar = () => {
//   const navigate = useNavigate();
//   const [showMenu, setShowMenu] = useState(false);
//   const [token, setToken] = useState<string | null>(null);

//   // Check token on component mount
//   useEffect(() => {
//     const storedToken = localStorage.getItem("dToken");
//     setToken(storedToken);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("dToken"); // Remove token from localStorage
//     setToken(null); // Clear token state
//     navigate("/doctor/login"); // Redirect to login page
//   };

//   return (
//     <div className="flex item-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
//       <img
//         onClick={() => navigate("/")}
//         className="w-44 cursor-pointer"
//         src={assets.mylogo}
//         alt=""
//       />
//       <ul className="hidden md:flex items-start gap-5 font-medium">
//         <NavLink to="/">
//           <li className="py-1">HOME</li>
//           <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
//         </NavLink>
//         <NavLink to="/doctors">
//           <li className="py-1">ALL DOCTORS</li>
//           <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
//         </NavLink>
//         <NavLink to="/about">
//           <li className="py-1">ABOUT</li>
//           <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
//         </NavLink>
//         <NavLink to="/contact">
//           <li className="py-1">CONTACT</li>
//           <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
//         </NavLink>
//       </ul>
//       <div className="flex item-center gap-4">
//         {token ? (
//           <div className="flex item-center gap-2 cursor-pointer group relative">
//             <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
//             <img className="w-2.5" src={assets.dropdown_icon} alt="" />
//             <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
//               <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
//                 <p
//                   onClick={() => navigate("/doctor/my-profile")}
//                   className="hover:text-black cursor-pointer"
//                 >
//                   My Profile
//                 </p>
//                 <p
//                   onClick={() => navigate("/doctor/my-appointments")}
//                   className="hover:text-black cursor-pointer"
//                 >
//                   My Appointments
//                 </p>
//                 <p
//                   onClick={handleLogout}
//                   className="hover:text-black cursor-pointer"
//                 >
//                   Logout
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <button
//             onClick={() => navigate("/doctor/login")}
//             className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
//           >
//             Login
//           </button>
//         )}
//         <img
//           onClick={() => setShowMenu(true)}
//           className="w-6 md:hidden"
//           src={assets.menu_icon}
//           alt=""
//         />
//         {/* ------------ Mobile Menu ------------ */}
//         <div
//           className={` ${
//             showMenu ? "fixed w-full" : "h-0 w-0"
//           } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
//         >
//           <div className="flex items-center justify-between px-5 py-6">
//             <img className="w-36" src={assets.logo} alt="" />
//             <img
//               className="w-7"
//               onClick={() => setShowMenu(false)}
//               src={assets.cross_icon}
//               alt=""
//             />
//           </div>
//           <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
//             <NavLink onClick={() => setShowMenu(false)} to="/">
//               <p className="px-4 py-2 rounded inline-block">HOME</p>
//             </NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to="/doctors">
//               <p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p>
//             </NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to="/about">
//               <p className="px-4 py-2 rounded inline-block">ABOUT</p>
//             </NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to="/contact">
//               <p className="px-4 py-2 rounded inline-block">CONTACT</p>
//             </NavLink>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorNavbar;

// frontend/src/components/doctor/DoctorNavbar.tsx
import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { DoctorContext } from "../../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const DoctorNavbar = () => {
  const context = useContext(DoctorContext);

  if (!context) {
    throw new Error("DoctorContext must be used within DoctorContextProvider");
  }

  const { dToken, setDToken } = context;
  const navigate = useNavigate();

  const logout = () => {
    navigate("/doctor/login");
    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img className="w-36 sm:w-40 cursor-pointer" src={assets.mylogo} alt="" />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          Doctor
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-primary text-white text-sm px-10 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default DoctorNavbar;