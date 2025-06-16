import { IAdminRepository } from "../interface/IAdminRepository";
import doctorModel from "../../models/doctorModel";
import { DoctorData } from "../../types/doctors";
import { userData } from "../../types/user";
import userModel from "../../models/userModels";
import { adminData } from "../../types/admin";
import adminModel from "../../models/adminModel";
import appointmentModel from "../../models/appointmentModel";
import { AdminDocument } from "../../types/admin";
import { AppointmentDocument } from "../../types/appointment";
import { BaseRepository } from "../BaseRepository";

// export class AdminRepository implements IAdminRepository {
//   async findByEmail(email: string): Promise<adminData | null> {
//     return (await adminModel.findOne({ email })) as adminData | null;
//   }

//   async saveDoctor(data: DoctorData): Promise<void> {
//     const newDoctor = new doctorModel(data);
//     await newDoctor.save();
//   }

//   async getAllDoctors(): Promise<Omit<DoctorData, "password">[]> {
//     return await doctorModel.find({}).select("-password");
//   }

//   async getAllUsers(): Promise<Omit<userData, "password">[]> {
//     return await userModel.find({}).select("-password");
//   }

//   async toggleUserBlock(userId: string): Promise<string> {
//     const user = await userModel.findById(userId);
//     if (!user) throw new Error("User not found");

//     user.isBlocked = !user.isBlocked;
//     await user.save();

//     return user.isBlocked ? "User blocked" : "User unblocked";
//   }

//   async updateDoctorBlockStatus(doctorId: string, isBlocked: boolean): Promise<void> {
//     await doctorModel.findByIdAndUpdate(doctorId, { isBlocked });
//   }
  
//   async findDoctorById(doctorId: string): Promise<DoctorData | null> {
//     return await doctorModel.findById(doctorId);
//   }
// }

export class AdminRepository extends BaseRepository<AdminDocument> {
  constructor() {
    super(adminModel); // ✅ Now types match
  }

  async findByEmail(email: string): Promise<AdminDocument | null> {
    return this.findOne({ email });
  }

  async saveDoctor(data: DoctorData): Promise<void> {
    const newDoctor = new doctorModel(data);
    await newDoctor.save();
  }

  async getAllDoctors(): Promise<Omit<DoctorData, "password">[]> {
    return doctorModel.find({}).select("-password");
  }

  async getAllUsers(): Promise<Omit<userData, "password">[]> {
    return userModel.find({}).select("-password");
  }

  async toggleUserBlock(userId: string): Promise<string> {
    const user = await userModel.findById(userId);
    if (!user) throw new Error("User not found");

    user.isBlocked = !user.isBlocked;
    await user.save();

    return user.isBlocked ? "User blocked" : "User unblocked";
  }

    async updateDoctorBlockStatus(doctorId: string, isBlocked: boolean): Promise<void> {
    await doctorModel.findByIdAndUpdate(doctorId, { isBlocked });
  }

    async findDoctorById(doctorId: string): Promise<DoctorData | null> {
    return await doctorModel.findById(doctorId);
  }

  async getAllAppointments(): Promise<AppointmentDocument[]> {
    return appointmentModel.find({});
  }

  async cancelAppointment(appointmentId: string): Promise<void> {
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) throw new Error("Appointment not found");

    if (appointment.cancelled) {
      throw new Error("Appointment already cancelled");
    }

    appointment.cancelled = true;
    await appointment.save();

    const { docId, slotDate, slotTime } = appointment;
    const doctor = await doctorModel.findById(docId);
    if (doctor) {
      const slots = doctor.slots_booked || {};
      if (Array.isArray(slots[slotDate])) {
        slots[slotDate] = slots[slotDate].filter((t: string) => t !== slotTime);
        if (!slots[slotDate].length) delete slots[slotDate];
        doctor.slots_booked = slots;
        doctor.markModified("slots_booked");
        await doctor.save();
      }
    }
  }
}