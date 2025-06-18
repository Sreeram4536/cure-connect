import { DoctorData } from "../../types/doctors";
import { AppointmentTypes } from "../../types/appointment";

export interface IDoctorRepository {
  findById(id: string): Promise<DoctorData | null>;
  updateAvailability(id: string, available: boolean): Promise<void>;
  findAllDoctors(): Promise<Partial<DoctorData>[]>;
  findByEmail(email: string): Promise<DoctorData | null>;
  comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
  updateBlockStatus(doctorId: string, isBlocked: boolean): Promise<void>;
   findAppointmentsByDoctorId(docId: string): Promise<AppointmentTypes[]>;
  findAppointmentById(id: string): Promise<AppointmentTypes | null>;
  markAppointmentAsConfirmed(id: string): Promise<void>;
  cancelAppointment(id: string): Promise<void>
  updateById(docId: string, data: Partial<DoctorData>): Promise<void>;
}