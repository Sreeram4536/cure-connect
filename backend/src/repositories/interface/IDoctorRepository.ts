import { DoctorData } from "../../types/doctors";

export interface IDoctorRepository {
  findById(id: string): Promise<DoctorData | null>;
  updateAvailability(id: string, available: boolean): Promise<void>;
  findAllDoctors(): Promise<Partial<DoctorData>[]>;
  findByEmail(email: string): Promise<{ _id: string; email: string; password: string } | null>;
  comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
}