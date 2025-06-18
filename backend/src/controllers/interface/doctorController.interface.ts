import { Request, Response } from "express";

export interface IDoctorController {
  loginDoctor(req: Request, res: Response): Promise<void>;
  changeAvailability(req: Request, res: Response): Promise<void>;
  doctorList(req: Request, res: Response): Promise<void>;
  appointmentsDoctor(req: Request, res: Response): Promise<void>;
  appointmentConfirm(req: Request, res: Response): Promise<void>;
  appointmentCancel(req: Request, res: Response): Promise<void>;
   getProfile(req: Request, res: Response): Promise<void>;
  updateProfile(req: Request, res: Response): Promise<void>;
}