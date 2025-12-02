import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import UserModel, { User } from "../models/User";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body as {
      name: string;
      email?: string;
      password: string;
      phone?: string;
    };

    if (!name || !password) {
      return res.status(400).json({ error: "Name and password are required" });
    }

    const existing = await UserModel.findOne({ name });
    if (existing) {
      return res.status(409).json({ error: "Username already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      passwordHash,
      phone,
    });

    const { passwordHash: _, ...safeUser } = user.toObject();

    return res.status(201).json(safeUser);
  } catch (err) {
    console.error("Error registering user", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// GET users
router.get("/", async (req: Request, res: Response) => {
  try {
    const users: User[] = await UserModel.find()
      .select("-passwordHash")
      .sort({ createdAt: -1 });
    return res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// GET users by id

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id).select(
      "-passwordHash"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
