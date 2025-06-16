import { Document } from "mongoose";
import { adminData } from "./admin";

export interface adminData {
    _id: string;
    email: string;
    password: string;
  }

  export interface AdminDocument extends adminData, Document {
  _id: string;
}