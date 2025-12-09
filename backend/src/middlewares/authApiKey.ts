import { Request, Response, NextFunction } from "express";

export const authApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["x-api-key"] as string | undefined;

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: "Invalid API key" });
  }

  next();
};
