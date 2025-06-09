import { Request, Response, NextFunction } from "express";
import userModel from "../models/userModels";

export  const checkBlocked = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).userId;
  const user = await userModel.findById(userId);
  if (user && user.isBlocked) {
    return res.status(401).json({ success: false, message: "blocked" });
  }
  next();
};


