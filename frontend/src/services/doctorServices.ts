import { api } from "../axios/axiosInstance";

// To list all doctors
export const getDoctorsAPI = async () => {
  return await api.get("/api/doctor/list");
};

// Doctor login API
export const doctorLoginAPI = async (email: string, password: string) => {
    return await api.post("/api/doctor/login", { email, password });
  };