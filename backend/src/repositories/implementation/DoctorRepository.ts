import doctorModel from "../../models/doctorModel";
import { DoctorData } from "../../types/doctors";
import { IDoctorRepository } from "../interface/IDoctorRepository";
import bcrypt from 'bcrypt'

export class DoctorRepository implements IDoctorRepository {
  async findById(id: string): Promise<DoctorData | null> {
    return await doctorModel.findById(id);
  }

  async updateAvailability(id: string, available: boolean): Promise<void> {
    await doctorModel.findByIdAndUpdate(id, { available });
  }

  async findAllDoctors(): Promise<Partial<DoctorData>[]> {
    return await doctorModel.find({}).select("-password -email");
  }

//   async findByEmail(email: string): Promise<DoctorData | null> {
//     return await doctorModel.findOne({ email });
//   }

//   async comparePassword(
//     plainPassword: string,
//     hashedPassword: string
//   ): Promise<boolean> {
//     return await bcrypt.compare(plainPassword, hashedPassword);
//   }
}