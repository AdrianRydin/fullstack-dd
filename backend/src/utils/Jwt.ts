import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export type UserRole = "CUSTOMER" | "STAFF" | "ADMIN";

export interface JwtPayload {
  id: string;
  role: UserRole;
}

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set");
}

export const createToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};