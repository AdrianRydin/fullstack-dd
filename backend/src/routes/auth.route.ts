import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import UserModel from "../models/User";
import { authApiKey } from "../middlewares/authApiKey";
import { createToken } from "../utils/Jwt";

const router = Router();
router.use(authApiKey);

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, phone } = req.body as {
        name?: string;
        email?: string;
        password?: string;
        phone?: string;
      };

      if (!name || !password) {
        return res
          .status(400)
          .json({ error: "Name and password are required" });
      }

      const existingByName = await UserModel.findOne({ name });
      if (existingByName) {
        return res.status(409).json({ error: "Username already in use" });
      }

      if (email) {
        const existingByEmail = await UserModel.findOne({ email });
        if (existingByEmail) {
          return res.status(409).json({ error: "Email already in use" });
        }
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const user = await UserModel.create({
        name,
        email,
        passwordHash,
        phone,
        role: "CUSTOMER",
      });

      const { passwordHash: _pw, ...safeUser } = user.toObject();

      return res.status(201).json(safeUser);
    } catch (err) {
      console.error("Error registering user", err);
      return next(err);
    }
  }
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, password } = req.body as {
        email?: string;
        name?: string;
        password?: string;
      };

      if (!password || (!email && !name)) {
        return res
          .status(400)
          .json({ message: "Email or name and password are required" });
      }

      const query: Record<string, unknown> = {};
      if (email) query.email = email;
      else if (name) query.name = name;

      const user = await UserModel.findOne(query);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = createToken({
        id: user._id.toString(),
        role: (user.role || "CUSTOMER") as "CUSTOMER" | "STAFF" | "ADMIN",
      });

      const { passwordHash, ...safeUser } = user.toObject();
      return res.json({ token, user: safeUser });
    } catch (err) {
      console.error("Error logging in user", err);
      return next(err);
    }
  }
);

export default router;
