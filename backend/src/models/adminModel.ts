// import mongoose, { Schema, Model } from "mongoose";
// import { adminData } from "../types/admin";


// interface AdminDocument extends adminData {}

// const adminSchema: Schema<AdminDocument> = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },

//   password: {
//     type: String,
//     required: true,
//   },
// });

// const adminModel: Model<AdminDocument> = mongoose.model<AdminDocument>(
//   "admin",
//   adminSchema
// );

// export default adminModel;

// models/adminModel.ts
import mongoose, { Schema, Model } from "mongoose";
import { AdminDocument } from "../types/admin";

const adminSchema = new Schema<AdminDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // other fields
});

const adminModel: Model<AdminDocument> = mongoose.model("admin", adminSchema);

export default adminModel;