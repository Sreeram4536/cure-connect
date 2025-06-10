import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doctorLoginAPI } from "../../services/doctorServices";
import { assets } from "../../assets/assets";

const DoctorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await doctorLoginAPI(email, password);
      if (data.success) {
        localStorage.setItem("dToken", data.token);
        toast.success("Login successful!");
        navigate("/doctor/dashboard");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <form onSubmit={handleLogin}>
        <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="hidden sm:block w-full sm:w-96">
            <img
              src={assets.about_image}
              alt="Doctor Login Visual"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-3 p-8 min-w-[340px] sm:min-w-96 text-[#5E5E5E] text-sm">
            <p className="text-2xl font-semibold m-auto">
              <span className="text-primary">Doctor</span> Login
            </p>
            <div className="w-full">
              <p>Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                type="email"
                required
              />
            </div>
            <div className="w-full">
              <p>Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                type="password"
                required
              />
            </div>
            <button className="bg-primary text-white w-full py-2 rounded-md text-base">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DoctorLogin;