import React,{ createContext,useState,useEffect } from "react";
import type { ReactNode } from "react";
import type { AppointmentTypes } from "../types/appointment";
import { showErrorToast } from "../utils/errorHandler";
import { toast } from "react-toastify";
import { AppointmentCancelAPI, AppointmentConfirmAPI, getDoctorAppointmentsAPI, getDoctorProfileAPI } from "../services/doctorServices";
import { Doctor } from "../types/doctor";



interface DoctorContextType {
   dToken: string;
  setDToken: React.Dispatch<React.SetStateAction<string>>;
  backendUrl: string;
  appointments: AppointmentTypes[];
  setAppointments: React.Dispatch<React.SetStateAction<AppointmentTypes[]>>;
  getAppointments: () => Promise<void>;
  confirmAppointment: (appointmentId: string) => Promise<void>;
  cancelAppointment: (appointmentId: string) => Promise<void>;
  doctorData: Doctor | null;
   setDoctorData: React.Dispatch<React.SetStateAction<any>>;
  loadDoctorProfileData: () => Promise<void>;
}

export const DoctorContext = createContext<DoctorContextType | null>(null);

interface DoctorContextProviderProps {
  children: ReactNode;
}

const DoctorContextProvider = ({ children }: DoctorContextProviderProps) => {
   const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(localStorage.getItem("dToken") ?? "");
  const [appointments, setAppointments] = useState<AppointmentTypes[]>([]);
   const [doctorData, setDoctorData] = useState<Doctor | null>(null);

    useEffect(() => {
    if (dToken) {
      loadDoctorProfileData();
    } else {
      setDoctorData(null);
    }
  }, [dToken]);

  const getAppointments = async () => {
    try {
      const { data } = await getDoctorAppointmentsAPI(dToken);

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      showErrorToast(error);
    }
  };

  const loadDoctorProfileData = async () => {
    try {
      if (!dToken) {
        return;
      }

      const { data } = await getDoctorProfileAPI(dToken);
      if (data.success) {
        if (data.doctor.isBlocked) {
          toast.error("Your account has been blocked. Logging out.");
          localStorage.removeItem("dToken");
          setDToken("");
          setDoctorData(null);
          return;
        }
        setDoctorData(data.doctor);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      showErrorToast(error);
    }
  };


  const confirmAppointment = async (appointmentId: string) => {
    try {
      const { data } = await AppointmentConfirmAPI(appointmentId, dToken);

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      showErrorToast(error);
    }
  };

  const cancelAppointment = async (appointmentId: string) => {
    try {
      const { data } = await AppointmentCancelAPI(appointmentId, dToken);

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      showErrorToast(error);
    }
  };
  const value: DoctorContextType = {
     dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    confirmAppointment,
    cancelAppointment,
    doctorData,
    setDoctorData,
    loadDoctorProfileData
    
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;