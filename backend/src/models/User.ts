import { Schema, model, InferSchemaType } from "mongoose";
import type { UserRole } from "../utils/Jwt";

export interface IUser extends Document {
  name?: string;
  email: string;
  passwordHash: string;
  phone?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ["CUSTOMER", "STAFF", "ADMIN"],
      default: "CUSTOMER",  
    },
  },
  { timestamps: true }
);

export type User = InferSchemaType<typeof userSchema>;

const UserModel = model<User>("User", userSchema);

export default UserModel;
