import { api } from "../axios/axiosInstance";

// To list all doctors
export const getDoctorsAPI = async () => {
  return await api.get("/api/doctor/list");
};

// Doctor login API
export const doctorLoginAPI = async (email: string, password: string) => {
    return await api.post("/api/doctor/login", { email, password });
  };

  // For getting all doctor appointments
export const getDoctorAppointmentsAPI = async (token: string) => {
  return api.get("/api/doctor/appointments", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// For marking a doctor appointment as confirmed
export const AppointmentConfirmAPI = async (
  appointmentId: string,
  token: string
) => {
  return api.patch(
    `/api/doctor/appointments/${appointmentId}/confirm`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// For cancelling a doctor appointment (REST update)
export const AppointmentCancelAPI = async (
  appointmentId: string,
  token: string
) => {
  return api.patch(
    `/api/doctor/appointments/${appointmentId}/cancel`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getDoctorProfileAPI = async (token: string) => {
  return await api.get("/api/doctor/get-profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateDoctorProfileAPI = async (token: string, data: any, image: File | null) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("speciality", data.speciality); // Changed from specialization
    formData.append("degree", data.degree); // Changed from qualification
    formData.append("experience", data.experience);
    formData.append("fees", data.fees.toString()); // Changed from consultationFee
    formData.append("about", data.about);
    formData.append("address[line1]", data.address.line1);
    formData.append("address[line2]", data.address.line2);
    if (data.address.city) formData.append("address[city]", data.address.city);
    if (data.address.state) formData.append("address[state]", data.address.state);
    if (data.address.pincode) formData.append("address[pincode]", data.address.pincode);
    if (image) formData.append("image", image);

    const res = await api.put("/api/doctor/update-profile", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};