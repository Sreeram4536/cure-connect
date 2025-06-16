import { adminData } from "../../types/admin";
import { DoctorData } from "../../types/doctors";
import { userData } from "../../types/user";
import { AppointmentDocument } from "../../types/appointment";

export interface IAdminRepository {
  findByEmail(email: string): Promise<adminData | null>;
  saveDoctor(data: DoctorData): Promise<void>;
  getAllDoctors(): Promise<Omit<DoctorData, "password">[]>;
  getAllUsers(): Promise<Omit<userData, "password">[]>;
  toggleUserBlock(userId: string): Promise<string>;
  findDoctorById(doctorId: string): Promise<DoctorData | null>; 
  updateDoctorBlockStatus(doctorId: string, isBlocked: boolean): Promise<void>;
  getAllAppointments():Promise<AppointmentDocument[]>;
  cancelAppointment(appointmentId: string): Promise<void>;
}