import { DoctorData } from "../../types/doctors";
import { AppointmentTypes } from "../../types/appointment";

export interface IDoctorService {
    loginDoctor(email: string, password: string): Promise<string>;
    toggleAvailability(docId: string): Promise<void>;
    getAllDoctors(): Promise<any[]>;
     blockDoctor(doctorId: string, isBlocked: boolean): Promise<void>;
  findDoctorByEmail(email: string): Promise<DoctorData | null>;
  getDoctorAppointments(docId: string): Promise<AppointmentTypes[]>;
  confirmAppointment(docId: string, appointmentId: string): Promise<void>;
  cancelAppointment(docId: string, appointmentId: string): Promise<void>;
     getDoctorById(docId: string): Promise<DoctorData | null>;
  updateDoctorProfile(docId: string, data: Partial<DoctorData>, imageFile?: Express.Multer.File): Promise<void>;
  }