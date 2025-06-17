import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

// Add this interceptor to include JWT token in every request
api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");
     let token ;
    const path = window.location.pathname;

    if (path.startsWith("/doctor")) {
      token = localStorage.getItem("dToken");
    } else if (path.startsWith("/admin")) {
      token = localStorage.getItem("aToken");
    } else {
      token = localStorage.getItem("token");
    }
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global response interceptor for blocked users
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.message === "blocked"
    ) {
      // Remove token and redirect to landing page
      localStorage.removeItem("token");
      toast.error("Your account has been blocked by admin. Logging out.");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
