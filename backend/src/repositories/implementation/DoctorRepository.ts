import doctorModel from "../../models/doctorModel";
import { DoctorData ,DoctorDocument} from "../../types/doctors";
import { IDoctorRepository } from "../interface/IDoctorRepository";
import bcrypt from 'bcrypt'
import appointmentModel from "../../models/appointmentModel";
import { AppointmentTypes } from "../../types/appointment";
import { BaseRepository } from "../BaseRepository";

// export class DoctorRepository implements IDoctorRepository {
//   async findById(id: string): Promise<DoctorData | null> {
//     return await doctorModel.findById(id);
//   }

//   async updateAvailability(id: string, available: boolean): Promise<void> {
//     await doctorModel.findByIdAndUpdate(id, { available });
//   }

//   async findAllDoctors(): Promise<Partial<DoctorData>[]> {
//     return await doctorModel.find({}).select("-password -email");
//   }

//   async findByEmail(email: string): Promise<{ _id: string; email: string; password: string } | null> {
//     return await doctorModel.findOne({ email }).select("_id email password");
//   }

//   async comparePassword(
//     plainPassword: string,
//     hashedPassword: string
//   ): Promise<boolean> {
//     return await bcrypt.compare(plainPassword, hashedPassword);
//   }

//   async updateBlockStatus(doctorId: string, isBlocked: boolean): Promise<void> {
//     await doctorModel.findByIdAndUpdate(doctorId, { isBlocked }); // Update block status
//   }

//     async findAppointmentsByDoctorId(docId: string): Promise<AppointmentTypes[]> {
//     return await appointmentModel.find({ docId });
//   }

//   async findAppointmentById(id: string): Promise<AppointmentTypes | null> {
//     return await appointmentModel.findById(id);
//   }

//   async markAppointmentAsConfirmed(id: string): Promise<void> {
//     await appointmentModel.findByIdAndUpdate(id, { isConfirmed: true });
//   }

//   async cancelAppointment(id: string): Promise<void> {
//     await appointmentModel.findByIdAndUpdate(id, { cancelled: true });
//   }
// }

export class DoctorRepository extends BaseRepository<DoctorDocument> implements IDoctorRepository {
  constructor() {
    super(doctorModel);
  }

    async registerDoctor(data: DoctorData): Promise<DoctorDocument> {
    return doctorModel.create(data);
  }

  async findByEmail(email: string): Promise<DoctorData | null> {
    return this.findOne({ email });
  }

  async save(doctor: DoctorDocument): Promise<void> {
    await doctor.save();
  }

  async updateAvailability(id: string, available: boolean): Promise<void> {
    await this.updateById(id, { available });
  }

  async findAllDoctors(): Promise<Partial<DoctorData>[]> {
    return doctorModel.find({}).select("-password -email");
  }

  async findAppointmentsByDoctorId(docId: string): Promise<AppointmentTypes[]> {
    return appointmentModel.find({ docId });
  }

  async findAppointmentById(id: string): Promise<AppointmentTypes | null> {
    return appointmentModel.findById(id);
  }

  async markAppointmentAsConfirmed(id: string): Promise<void> {
    await appointmentModel.findByIdAndUpdate(id, { isConfirmed: true });
  }

  async cancelAppointment(id: string): Promise<void> {
    await appointmentModel.findByIdAndUpdate(id, { cancelled: true });
  }

    async comparePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async updateBlockStatus(doctorId: string, isBlocked: boolean): Promise<void> {
    await doctorModel.findByIdAndUpdate(doctorId, { isBlocked }); // Update block status
  }

  // async updateById(id: string, data: Partial<DoctorData>): Promise<DoctorData> {
  //   const updatedDoctor = await doctorModel.findByIdAndUpdate(
  //     id,
  //     { $set: data },
  //     { new: true }
  //   ).select("-password");
    
  //   if (!updatedDoctor) {
  //     throw new Error("Doctor not found");
  //   }
    
  //   return updatedDoctor;
  // }
  async updateById(id: string, data: Partial<DoctorData>): Promise<void> {
    await doctorModel.findByIdAndUpdate(id, data);
  }
}