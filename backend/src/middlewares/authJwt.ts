import { Request, Response, NextFunction } from "express";
import { JwtPayload, verifyToken } from "../utils/Jwt";

export interface AuthRequest extends Request {
  user?: JwtPayload | null;
}

export const authJwt = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const headerToken = req.headers["authorization"]?.toString().split(" ")[1];
  const cookieToken = (req as any).cookies?.token;
  const token = headerToken || cookieToken;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // id, role
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Valfri token används för till ex orders där kund kan vara gäst eller om man inloggad
export const optionalAuthJwt = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  const headerToken = req.headers["authorization"]?.toString().split(" ")[1];
  const cookieToken = (req as any).cookies?.token;
  const token = headerToken || cookieToken;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
  } catch {
    req.user = null;
  }

  next();
};

export const requireRole = (role: "STAFF" | "ADMIN") => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (req.user.role !== role && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};
