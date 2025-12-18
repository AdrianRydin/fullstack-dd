import { Request, Response, NextFunction } from "express"
import { JwtPayload, verifyToken } from "../utils/Jwt"

export interface AuthRequest extends Request {
  user?: JwtPayload | null
}

function getTokenFromRequest(req: Request): string | undefined {
  const cookieToken = (req as any).cookies?.token as string | undefined;

  const authHeader = req.headers.authorization;
  const headerToken =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : undefined;

  return cookieToken || headerToken;
}

export const authJwt = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    return res.status(401).json({ message: "No token provided" })
  }

  try {
    const decoded = verifyToken(token)
    req.user = decoded // id, role
    next()
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" })
  }
}

// Valfri token används för till ex orders där kund kan vara gäst eller om man inloggad
export const optionalAuthJwt = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    req.user = null
    return next()
  }

  try {
    req.user = verifyToken(token)
  } catch {
    req.user = null
  }

  next()
}

export const requireRole = (role: "STAFF" | "ADMIN") => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" })
    }

    if (req.user.role !== role && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden" })
    }

    next()
  }
}
