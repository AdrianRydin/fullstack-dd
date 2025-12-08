import { Router, Response, NextFunction } from "express";
import UserModel from "../models/User";
import { authApiKey } from "../middlewares/authApiKey";
import { authJwt, requireRole, AuthRequest } from "../middlewares/authJwt";

const router = Router();

router.use(authApiKey);
router.use(authJwt);
router.use(requireRole("ADMIN"));


router.get(
  "/",
  async (_req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const users = await UserModel.find()
        .select("-passwordHash")
        .sort({ createdAt: -1 });

      return res.json(users);
    } catch (err) {
      console.error("Error fetching users:", err);
      return next(err);
    }
  }
);

router.get(
  "/:id",
  async (req: AuthRequest, res: Response, next: NextFunction) => {
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
      return next(err);
    }
  }
);

export default router;
