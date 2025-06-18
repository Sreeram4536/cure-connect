import express from "express";
import { DoctorController } from "../controllers/implementation/DoctorController";
import { DoctorService } from "../services/implementation/DoctorService";
import { DoctorRepository } from "../repositories/implementation/DoctorRepository";
import authDoctor from "../middlewares/authDoctor";
import multer from "multer";
import upload from "../middlewares/multer";

const doctorRepository = new DoctorRepository();
const doctorService = new DoctorService(doctorRepository);
const doctorController = new DoctorController(doctorService);

const doctorRouter = express.Router();
// Multer setup for image upload
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

doctorRouter.get("/list", doctorController.doctorList.bind(doctorController));
doctorRouter.patch(
  "/availability",
  doctorController.changeAvailability.bind(doctorController)
);
doctorRouter.post("/login", doctorController.loginDoctor.bind(doctorController));

doctorRouter.get(
  "/appointments",
  authDoctor,
  doctorController.appointmentsDoctor.bind(doctorController)
);
doctorRouter.patch(
  "/appointments/:appointmentId/confirm",
  authDoctor,
  doctorController.appointmentConfirm.bind(doctorController)
);

doctorRouter.patch(
  "/appointments/:appointmentId/cancel",
  authDoctor,
  doctorController.appointmentCancel.bind(doctorController)
);

doctorRouter.get("/get-profile", authDoctor, doctorController.getProfile.bind(doctorController));
doctorRouter.put("/update-profile", authDoctor, upload.single("image"), doctorController.updateProfile.bind(doctorController));
export default doctorRouter;