// import React,{ useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AdminContext } from "../../context/AdminContext";

// const AdminAppointments = () => {
//   const navigate = useNavigate();
//   const context = useContext(AdminContext);

//   if (!context) {
//     throw new Error("AdminContext must be used within AdminContextProvider");
//   }

//   const { aToken } = context;

//   useEffect(() => {
//     if (!aToken) {
//       navigate("/admin/login");
//     }
//   });

//   return <div></div>;
// };

// export default AdminAppointments;


// frontend/src/pages/admin/AdminAppointments.tsx
import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/admin/assets";
import { useNavigate } from "react-router-dom";

const AdminAppointments = () => {
  const context = useContext(AdminContext);
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  if (!appContext) {
    throw new Error("AppContext must be used within AppContextProvider");
  }

  const { slotDateFormat, currencySymbol } = appContext;

  if (!context) {
    throw new Error("AdminContext must be used within AdminContextProvider");
  }

  const {
    aToken,
    appointments,
    getAllAppointments,
    cancelAppointment,
  } = context;

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  useEffect(() => {
    if (!aToken) {
      navigate("/admin/login");
    }
  });

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_2fr_1fr_2fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Doctor</p>
          <p>Payment</p>
          <p>Date & Time</p>
          <p>Status</p>
          <p>Action</p>
        </div>

        {appointments.map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_2fr_1fr_2fr_1fr_1fr] items-center gap-1 text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            {/* Patient */}
            <div className="flex items-center gap-2">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={item.userData?.image || "/default-avatar.png"}
                alt=""
              />
              <p>{item.userData?.name}</p>
            </div>
            {/* Doctor */}
            <div className="flex items-center gap-2">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={item.docData?.image || "/default-doctor.png"}
                alt=""
              />
              <p>{item.docData?.name}</p>
            </div>
            {/* Payment */}
            <div>
              <p className="text-xs inline border border-primary px-2 rounded-full">
                {item.payment ? "Online" : "Cash"}
              </p>
            </div>
            {/* Date & Time */}
            <p>
              {slotDateFormat(item.slotDate)},{item.slotTime}
            </p>
            {/* Status */}
            <p>
              {item.cancelled ? (
                <span className="text-red-500">Cancelled</span>
              ) : (
                <span className="text-green-600">Active</span>
              )}
            </p>
            {/* Action */}
            <div>
              {!item.cancelled && (
                <img
                  onClick={() => cancelAppointment(item._id!)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt="Cancel"
                  title="Cancel Appointment"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAppointments;