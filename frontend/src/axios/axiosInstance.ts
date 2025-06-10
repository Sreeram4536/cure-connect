import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

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
