import { IDoctorRepository } from "../../repositories/interface/IDoctorRepository";
import { IDoctorService } from "../interface/IDoctorService";

export class DoctorService implements IDoctorService {
  constructor(private doctorRepository: IDoctorRepository) {}

//   async loginDoctor(email: string, password: string): Promise<string> {
//     const doctor = await this.doctorRepository.findByEmail(email);
//     if (!doctor) {
//       throw new Error("Doctor not found");
//     }

//     const isPasswordValid = await this.doctorRepository.comparePassword(
//       password,
//       doctor.password
//     );
//     if (!isPasswordValid) {
//       throw new Error("Invalid credentials");
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: doctor._id, email: doctor.email },
//       process.env.JWT_SECRET!,
//       { expiresIn: "1d" }
//     );

//     return token;
//   }

  async toggleAvailability(docId: string): Promise<void> {
    const doc = await this.doctorRepository.findById(docId);
    if (!doc) throw new Error("Doctor not found");

    await this.doctorRepository.updateAvailability(docId, !doc.available);
  }

  async getAllDoctors(): Promise<any[]> {
    return await this.doctorRepository.findAllDoctors();
  }
}