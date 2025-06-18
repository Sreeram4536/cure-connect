// frontend/src/pages/doctor/DoctorProfile.tsx
import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { updateDoctorProfileAPI } from "../../services/doctorServices";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../utils/errorHandler";

const DoctorProfile = () => {
  const navigate = useNavigate();
  const context = useContext(DoctorContext);

  if (!context) {
    throw new Error("DoctorProfile must be used within DoctorContextProvider");
  }

  const { dToken, doctorData, setDoctorData, loadDoctorProfileData } = context;

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const updateDoctorProfileData = async () => {
    try {
      setLoading(true);
      
      if (!dToken) {
        toast.error("Please login to continue...");
        return;
      }

      if (!doctorData) {
        toast.error("No doctor data available");
        return;
      }

      const data = await updateDoctorProfileAPI(
        dToken,
        {
          name: doctorData.name,
          email: doctorData.email,
          speciality: doctorData.speciality,
          degree: doctorData.degree,
          experience: doctorData.experience,
          fees: doctorData.fees,
          about: doctorData.about,
          address: doctorData.address,
        },
        image
      );

      toast.success(data.message);
      await loadDoctorProfileData();
      setIsEdit(false);
      setImage(null);
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!dToken) {
      navigate("/doctor/login");
    }
  }, [dToken, navigate]);

  if (!doctorData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="text-lg text-gray-300 mb-4">Loading profile...</div>
          <button
            onClick={() => loadDoctorProfileData()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Image */}
            <div className="relative">
              <label htmlFor="image" className="cursor-pointer group">
                <div className="relative">
                  <img
                    className={`w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-indigo-500 shadow-lg object-cover transition-all duration-300 ${
                      isEdit ? "opacity-80 group-hover:opacity-60" : ""
                    }`}
                    src={image ? URL.createObjectURL(image) : doctorData.image}
                    alt="Profile"
                  />
                  {isEdit && !image && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <img className="w-8 h-8" src={assets.upload_icon} alt="Upload" />
                    </div>
                  )}
                </div>
                {isEdit && (
                  <input
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    type="file"
                    id="image"
                    accept="image/*"
                    hidden
                  />
                )}
              </label>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              {isEdit ? (
                <input
                  className="bg-gray-700 text-2xl font-bold text-white text-center md:text-left rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                  type="text"
                  value={doctorData.name}
                  onChange={(e) =>
                    setDoctorData((prev) =>
                      prev ? { ...prev, name: e.target.value } : prev
                    )
                  }
                />
              ) : (
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {doctorData.name}
                </h1>
              )}
              <p className="text-indigo-400 font-medium text-lg mb-2">{doctorData.speciality}</p>
              <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {doctorData.available ? 'Available' : 'Not Available'}
                </span>
                <span>•</span>
                <span>{doctorData.experience} Experience</span>
                <span>•</span>
                <span>₹{doctorData.fees}</span>
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex gap-3">
              {isEdit ? (
                <button
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
                  onClick={updateDoctorProfileData}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              ) : (
                <button
                  className="bg-gray-700 border border-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
                  onClick={() => setIsEdit(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-indigo-500 rounded"></div>
              Contact Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm font-medium">Email</label>
                {isEdit ? (
                  <input
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    type="email"
                    value={doctorData.email}
                    onChange={(e) =>
                      setDoctorData((prev) =>
                        prev ? { ...prev, email: e.target.value } : prev
                      )
                    }
                  />
                ) : (
                  <p className="text-white mt-1">{doctorData.email}</p>
                )}
              </div>

              <div>
                <label className="text-gray-400 text-sm font-medium">Address</label>
                {isEdit ? (
                  <div className="space-y-2 mt-1">
                    <input
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={doctorData.address.line1}
                      onChange={(e) =>
                        setDoctorData((prev) =>
                          prev
                            ? {
                                ...prev,
                                address: { ...prev.address, line1: e.target.value },
                              }
                            : prev
                        )
                      }
                      placeholder="Address line 1"
                    />
                    <input
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={doctorData.address.line2}
                      onChange={(e) =>
                        setDoctorData((prev) =>
                          prev
                            ? {
                                ...prev,
                                address: { ...prev.address, line2: e.target.value },
                              }
                            : prev
                        )
                      }
                      placeholder="Address line 2"
                    />
                  </div>
                ) : (
                  <p className="text-white mt-1">
                    {doctorData.address.line1}
                    <br />
                    {doctorData.address.line2}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-indigo-500 rounded"></div>
              Professional Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm font-medium">Speciality</label>
                {isEdit ? (
                  <input
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    type="text"
                    value={doctorData.speciality}
                    onChange={(e) =>
                      setDoctorData((prev) =>
                        prev ? { ...prev, speciality: e.target.value } : prev
                      )
                    }
                  />
                ) : (
                  <p className="text-white mt-1">{doctorData.speciality}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm font-medium">Experience</label>
                  {isEdit ? (
                    <input
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      type="text"
                      value={doctorData.experience}
                      onChange={(e) =>
                        setDoctorData((prev) =>
                          prev ? { ...prev, experience: e.target.value } : prev
                        )
                      }
                    />
                  ) : (
                    <p className="text-white mt-1">{doctorData.experience}</p>
                  )}
                </div>

                <div>
                  <label className="text-gray-400 text-sm font-medium">Degree</label>
                  {isEdit ? (
                    <input
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      type="text"
                      value={doctorData.degree}
                      onChange={(e) =>
                        setDoctorData((prev) =>
                          prev ? { ...prev, degree: e.target.value } : prev
                        )
                      }
                    />
                  ) : (
                    <p className="text-white mt-1">{doctorData.degree}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm font-medium">Consultation Fee</label>
                {isEdit ? (
                  <input
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    type="number"
                    value={doctorData.fees}
                    onChange={(e) =>
                      setDoctorData((prev) =>
                        prev ? { ...prev, fees: Number(e.target.value) } : prev
                      )
                    }
                  />
                ) : (
                  <p className="text-white mt-1">₹{doctorData.fees}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 mt-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-indigo-500 rounded"></div>
            About
          </h3>
          {isEdit ? (
            <textarea
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              rows={4}
              value={doctorData.about}
              onChange={(e) =>
                setDoctorData((prev) =>
                  prev ? { ...prev, about: e.target.value } : prev
                )
              }
            />
          ) : (
            <p className="text-gray-300 leading-relaxed">{doctorData.about}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;