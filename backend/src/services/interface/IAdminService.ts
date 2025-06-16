import { DoctorData, DoctorDTO } from "../../types/doctors";
import { AppointmentDocument } from "../../types/appointment";

export interface DoctorInput extends DoctorData {
  imageFile?: Express.Multer.File;
}

export interface IAdminService {
  login(email: string, password: string): Promise<{ token: string }>;
  addDoctor(data: DoctorDTO): Promise<string>;
  getDoctors(): Promise<any[]>;
  getUsers(): Promise<any[]>;
  toggleUserBlock(userId: string, block: boolean): Promise<string>;
  toggleDoctorBlock(doctorId: string, isBlocked: boolean): Promise<string>;
   listAppointments(): Promise<AppointmentDocument[]>;
  cancelAppointment(appointmentId: string): Promise<void>;
}