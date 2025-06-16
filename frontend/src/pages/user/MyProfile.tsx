import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { updateUserProfileAPI } from "../../services/userProfileServices";
import { useNavigate } from "react-router-dom";
import { isValidDateOfBirth, isValidPhone } from "../../utils/validator";
import { showErrorToast } from "../../utils/errorHandler";

const MyProfile = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("TopDoctors must be used within an AppContextProvider");
  }

  const { userData, setUserData, token, loadUserProfileData } = context;

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  if (!userData) return null;

  const updateUserProfileData = async () => {
    try {
      if (!token) {
        toast.error("Please login to continue...");
        return;
      }

      if (!isValidPhone(userData.phone)) {
        toast.error("Phone number must be exactly 10 digits.");
        return;
      }

      if (!isValidDateOfBirth(userData.dob)) {
        toast.error("Please enter a valid birth date.");
        return;
      }

      const data = await updateUserProfileAPI(
        token,
        {
          name: userData.name,
          phone: userData.phone,
          address: userData.address,
          gender: userData.gender,
          dob: userData.dob,
          email: userData.email,
        },
        image
      );

      toast.success(data.message);
      await loadUserProfileData();
      setIsEdit(false);
      setImage(null);
    } catch (error) {
      showErrorToast(error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    userData && (
      <div className="max-w-xl mx-auto mt-10 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-3xl shadow-xl p-8 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="image" className="relative group cursor-pointer">
            <img
              className={`w-32 h-32 rounded-full border-4 border-blue-400 shadow-lg object-cover transition-all duration-300 ${
                isEdit ? "opacity-80 group-hover:opacity-60" : ""
              }`}
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="Profile"
            />
            {isEdit && !image && (
              <span className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full shadow-lg">
                <img className="w-6" src={assets.upload_icon} alt="Upload" />
              </span>
            )}
            {isEdit && (
              <input
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                type="file"
                id="image"
                hidden
              />
            )}
          </label>
          {isEdit ? (
            <input
              className="bg-blue-100 text-2xl font-semibold text-center rounded-lg px-3 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) =>
                  prev ? { ...prev, name: e.target.value } : prev
                )
              }
            />
          ) : (
            <h2 className="text-2xl font-bold text-blue-900 mt-2">
              {userData.name}
            </h2>
          )}
        </div>

        <div className="bg-white/80 rounded-xl p-6 shadow flex flex-col gap-4">
          <h3 className="text-blue-700 font-semibold text-lg mb-2">
            Contact Information
          </h3>
          <div className="grid grid-cols-[120px_1fr] gap-y-3 items-center">
            <span className="font-medium text-blue-900">Email:</span>
            {isEdit ? (
              <input
                className="bg-blue-50 border border-blue-200 rounded px-2 py-1"
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData((prev) =>
                    prev ? { ...prev, email: e.target.value } : prev
                  )
                }
              />
            ) : (
              <span className="text-blue-600">{userData.email}</span>
            )}

            <span className="font-medium text-blue-900">Phone:</span>
            {isEdit ? (
              <input
                className="bg-blue-50 border border-blue-200 rounded px-2 py-1"
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) =>
                    prev ? { ...prev, phone: e.target.value } : prev
                  )
                }
              />
            ) : (
              <span className="text-blue-600">{userData.phone}</span>
            )}

            <span className="font-medium text-blue-900">Address:</span>
            {isEdit ? (
              <div className="flex flex-col gap-1">
                <input
                  className="bg-blue-50 border border-blue-200 rounded px-2 py-1 mb-1"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) =>
                      prev
                        ? {
                            ...prev,
                            address: { ...prev.address, line1: e.target.value },
                          }
                        : prev
                    )
                  }
                  type="text"
                  placeholder="Address line 1"
                />
                <input
                  className="bg-blue-50 border border-blue-200 rounded px-2 py-1"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) =>
                      prev
                        ? {
                            ...prev,
                            address: { ...prev.address, line2: e.target.value },
                          }
                        : prev
                    )
                  }
                  type="text"
                  placeholder="Address line 2"
                />
              </div>
            ) : (
              <span className="text-blue-600 whitespace-pre-line">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </span>
            )}
          </div>
        </div>

        <div className="bg-white/80 rounded-xl p-6 shadow flex flex-col gap-4">
          <h3 className="text-blue-700 font-semibold text-lg mb-2">
            Basic Information
          </h3>
          <div className="grid grid-cols-[120px_1fr] gap-y-3 items-center">
            <span className="font-medium text-blue-900">Gender:</span>
            {isEdit ? (
              <select
                className="bg-blue-50 border border-blue-200 rounded px-2 py-1"
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) =>
                    prev ? { ...prev, gender: e.target.value } : prev
                  )
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <span className="text-blue-600">{userData.gender}</span>
            )}

            <span className="font-medium text-blue-900">Birthday:</span>
            {isEdit ? (
              <input
                className="bg-blue-50 border border-blue-200 rounded px-2 py-1"
                type="date"
                value={userData.dob || ""}
                onChange={(e) =>
                  setUserData((prev) =>
                    prev ? { ...prev, dob: e.target.value } : prev
                  )
                }
              />
            ) : (
              <span className="text-blue-600">{userData.dob}</span>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          {isEdit ? (
            <button
              className="bg-blue-700 text-white px-8 py-2 rounded-full font-semibold shadow hover:bg-blue-800 transition"
              onClick={updateUserProfileData}
            >
              Save Information
            </button>
          ) : (
            <button
              className="bg-white border border-blue-700 text-blue-700 px-8 py-2 rounded-full font-semibold shadow hover:bg-blue-700 hover:text-white transition"
              onClick={() => setIsEdit(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
