import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { adminLoginAPI } from "../../services/adminServices";
import { showErrorToast } from "../../utils/errorHandler";

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("AdminContext must be used within AdminContextProvider");
  }

  const { aToken, setAToken } = context;

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await adminLoginAPI(email, password);
        if (data.success) {
          navigate("/admin/dashboard");
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
      }
    } catch (error) {
      showErrorToast(error);
    }
  };

  useEffect(() => {
    if (aToken) {
      navigate("/admin/dashboard");
    }
  }, [aToken, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#181c2b] via-[#232946] to-[#181c2b] relative overflow-hidden">
    {/* Floating shapes */}
    <div className="absolute top-0 left-0 w-72 h-72 bg-[#2d3250] opacity-40 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#393e63] opacity-30 rounded-full blur-2xl animate-pulse" />

    <form onSubmit={onSubmitHandler} className="z-10 flex flex-col sm:flex-row bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden border border-white/20">
      {/* Illustration */}
      <div className="hidden sm:flex flex-col items-center justify-center w-96 bg-gradient-to-b from-[#232946]/80 to-[#181c2b]/80 p-8">
        <img
          src={assets.about_image}
          alt="Admin Login Visual"
          className="w-60 h-60 object-contain drop-shadow-2xl mb-6"
        />
        <h2 className="text-3xl font-bold text-white mb-2 tracking-wide">Admin Login</h2>
        <p className="text-zinc-300 text-center text-base">
          Welcome back, Admin!<br />Sign in to manage the platform and users.
        </p>
      </div>
      {/* Form */}
      <div className="flex flex-col gap-5 p-10 min-w-[340px] sm:min-w-96 text-zinc-200 bg-[#232946]/80">
        <div>
          <label className="text-zinc-300 font-medium">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="bg-[#181c2b] border border-[#393e63] rounded-lg p-3 text-zinc-100 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
            type="email"
            required
            autoFocus
          />
        </div>
        <div>
          <label className="text-zinc-300 font-medium">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="bg-[#181c2b] border border-[#393e63] rounded-lg p-3 text-zinc-100 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
            type="password"
            required
          />
        </div>
        <button
          className="mt-2 bg-gradient-to-r from-[#5f6fff] to-[#3b82f6] hover:from-[#3b82f6] hover:to-[#5f6fff] text-white font-semibold py-2 rounded-lg shadow-lg transition-all duration-200"
          type="submit"
        >
          Login
        </button>
        {/* Removed Doctor Login prompt */}
      </div>
    </form>
  </div>
);
};

export default Login;