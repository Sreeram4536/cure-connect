import { IDoctorRepository } from "../../repositories/interface/IDoctorRepository";
import { IDoctorService } from "../interface/IDoctorService";
import  jwt  from "jsonwebtoken";
import { DoctorData } from "../../types/doctors";
import doctorModel from "../../models/doctorModel";
import { AppointmentTypes } from "../../types/appointment";

export class DoctorService implements IDoctorService {
  constructor(private doctorRepository: IDoctorRepository) {}

  async loginDoctor(email: string, password: string): Promise<string> {
    console.log("Checking doctor with email:", email);
    const doctor = await this.doctorRepository.findByEmail(email);
    if (!doctor) {
      throw new Error("Doctor not found");
    }

    const isPasswordValid = await this.doctorRepository.comparePassword(
      password,
      doctor.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: doctor._id, email: doctor.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return token;
  }

  async toggleAvailability(docId: string): Promise<void> {
    const doc = await this.doctorRepository.findById(docId);
    if (!doc) throw new Error("Doctor not found");

    await this.doctorRepository.updateAvailability(docId, !doc.available);
  }

  async getAllDoctors(): Promise<any[]> {
    return await this.doctorRepository.findAllDoctors();
  }

  async blockDoctor(doctorId: string, isBlocked: boolean): Promise<void> {
    const doctor = await this.doctorRepository.findById(doctorId);
    if (!doctor) {
      throw new Error("Doctor not found");
    }
    await this.doctorRepository.updateBlockStatus(doctorId, isBlocked);
  }

  async findDoctorByEmail(email: string): Promise<DoctorData | null> {
    return await doctorModel.findOne({ email }).select(
      "_id name email password speciality degree experience about available fees address date slots_booked isBlocked"
    );
  }

   async getDoctorAppointments(docId: string): Promise<AppointmentTypes[]> {
    console.log("Looking for doctor with _id:", docId, typeof docId);
    const doctor = await this.doctorRepository.findById(docId);
    if (!doctor) {
      throw new Error("Doctor not found");
    }

    return await this.doctorRepository.findAppointmentsByDoctorId(docId);
  }

  async confirmAppointment(
    docId: string,
    appointmentId: string
  ): Promise<void> {
    const appointment = await this.doctorRepository.findAppointmentById(
      appointmentId
    );
    if (!appointment || appointment.docId !== docId) {
      throw new Error("Mark Failed");
    }
    await this.doctorRepository.markAppointmentAsConfirmed(appointmentId);
  }

  async cancelAppointment(docId: string, appointmentId: string): Promise<void> {
    const appointment = await this.doctorRepository.findAppointmentById(
      appointmentId
    );
    if (!appointment || appointment.docId !== docId) {
      throw new Error("Cancellation Failed");
    }
    await this.doctorRepository.cancelAppointment(appointmentId);
  }
}