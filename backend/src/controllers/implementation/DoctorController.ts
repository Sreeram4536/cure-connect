
import { Request, Response } from "express";
import { DoctorService } from "../../services/implementation/DoctorService";
import { IDoctorController } from "../interface/doctorController.interface";
import { HttpStatus } from "../../constants/status.constants";
import { ErrorType } from "../../types/error"
import { isValidEmail,isValidPassword } from "../../utils/validator";
import { HttpResponse } from "../../constants/responseMessage.constants";


export class DoctorController implements IDoctorController {
  constructor(private doctorService: DoctorService) {}

  async loginDoctor(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

       // Validate email format
    if (!email || !password) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ success: false, message: "Email and password are required" });
        return;
      }
  
      if (!isValidEmail(email)) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ success: false, message: "Invalid email format" });
        return;
      }
  
      if (!isValidPassword(password)) {
        res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message:
            "Password must be at least 8 characters long, contain at least 1 letter, 1 number, and 1 special character",
        });
        return;
      }

       // Fetch doctor data by email
    const doctor = await this.doctorService.findDoctorByEmail(email);
    if (!doctor) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ success: false, message: "Doctor not found" });
      return;
    }
      
      if (doctor.isBlocked) {
        res
          .status(HttpStatus.FORBIDDEN)
          .json({ success: false, message: "Your account is blocked. Please contact admin." });
        return;
      }
  
      // Validate password
    //   const isPasswordValid = await this.doctorService.comparePassword(password, doctor.password);
    //   if (!isPasswordValid) {
    //     res
    //       .status(HttpStatus.UNAUTHORIZED)
    //       .json({ success: false, message: "Invalid credentials" });
    //     return;
    //   }
      const token = await this.doctorService.loginDoctor(email, password);
      res.status(HttpStatus.OK).json({ success: true, token });
    } catch (error) {
        const err = error as Error;
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ success: false, message: err.message });
    }
  }



  // For updating doctor availability
  async changeAvailability(req: Request, res: Response): Promise<void> {
    try {
      const { docId } = req.body;
      await this.doctorService.toggleAvailability(docId);
      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Availability Changed" });
    } catch (error) {
      const err = error as ErrorType;
      console.log(err.message);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: err.message });
    }
  }


  // For getting all doctor profiles
  async doctorList(req: Request, res: Response): Promise<void> {
    try {
      const doctors = await this.doctorService.getAllDoctors();
      res.status(HttpStatus.OK).json({ success: true, doctors });
    } catch (error) {
      const err = error as ErrorType;
      console.log(err.message);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: err.message });
    }
  }

   // For getting doctor appointments
  async appointmentsDoctor(req: Request, res: Response): Promise<void> {
    try {
      const docId = (req as any).docId;
      console.log("Doctor ID from token:", docId);
      const appointments = await this.doctorService.getDoctorAppointments(docId);

      res.status(HttpStatus.OK).json({ success: true, appointments });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: (error as Error).message });
    }
  }

  // For appointment confirmation
  async appointmentConfirm(req: Request, res: Response): Promise<void> {
    try {
      const docId = (req as any).docId;
      const { appointmentId } = req.params;

      await this.doctorService.confirmAppointment(docId, appointmentId);

      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Appointment Confirmed" });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: (error as Error).message });
    }
  }

  // For appointment cancellation
  async appointmentCancel(req: Request, res: Response): Promise<void> {
    try {
      const docId = (req as any).docId;
      const { appointmentId } = req.params;

      await this.doctorService.cancelAppointment(docId, appointmentId);

      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Appointment Cancelled" });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: (error as Error).message });
    }
  }

  

}
