// src/middleware/csp.ts
import { Request, Response, NextFunction } from "express";

export const cspMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' http://localhost:4000 http://localhost:5173"
  );
  next();
};
