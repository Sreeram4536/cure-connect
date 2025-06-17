// frontend/src/pages/doctor/DoctorSlots.tsx
import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  maxAppointments: number;
  currentAppointments: number;
}

const DoctorSlots = () => {
  const context = useContext(DoctorContext);
  const navigate = useNavigate();
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [maxAppointments, setMaxAppointments] = useState(8);

  if (!context) {
    throw new Error("DoctorSlots must be used within DoctorContextProvider");
  }

  const { dToken } = context;

  useEffect(() => {
    if (!dToken) {
      navigate("/doctor/login");
    }
    // Fetch slots when component mounts
    fetchSlots();
  }, [dToken]);

  const fetchSlots = async () => {
    try {
      // Implement API call to fetch slots
      // const { data } = await getDoctorSlotsAPI(dToken);
      // setSlots(data.slots);
    } catch (error) {
      toast.error("Failed to fetch slots");
    }
  };

  const handleAddSlot = async () => {
    try {
      // Implement API call to add slot
      // await addDoctorSlotAPI(dToken, {
      //   day: selectedDay,
      //   startTime,
      //   endTime,
      //   maxAppointments
      // });
      toast.success("Slot added successfully");
      setShowAddModal(false);
      fetchSlots();
    } catch (error) {
      toast.error("Failed to add slot");
    }
  };

  const handleToggleAvailability = async (slotId: string) => {
    try {
      // Implement API call to toggle slot availability
      // await toggleSlotAvailabilityAPI(dToken, slotId);
      toast.success("Slot availability updated");
      fetchSlots();
    } catch (error) {
      toast.error("Failed to update slot availability");
    }
  };

  const handleDeleteSlot = async (slotId: string) => {
    try {
      // Implement API call to delete slot
      // await deleteDoctorSlotAPI(dToken, slotId);
      toast.success("Slot deleted successfully");
      fetchSlots();
    } catch (error) {
      toast.error("Failed to delete slot");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Slot Management</h1>
            <p className="text-gray-600 mt-1">Manage your consultation time slots</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Add New Slot
          </button>
        </div>
      </div>

      {/* Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{slot.day}</h3>
                <p className="text-gray-600">
                  {slot.startTime} - {slot.endTime}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleAvailability(slot.id)}
                  className={`p-2 rounded-lg ${
                    slot.isAvailable
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {slot.isAvailable ? "Available" : "Unavailable"}
                </button>
                <button
                  onClick={() => handleDeleteSlot(slot.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Max Appointments:</span>
                <span className="font-medium text-gray-800">
                  {slot.maxAppointments}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Current Appointments:</span>
                <span className="font-medium text-gray-800">
                  {slot.currentAppointments}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{
                    width: `${(slot.currentAppointments / slot.maxAppointments) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Slot Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add New Slot
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Day
                </label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Appointments
                </label>
                <input
                  type="number"
                  value={maxAppointments}
                  onChange={(e) => setMaxAppointments(Number(e.target.value))}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSlot}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Add Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorSlots;