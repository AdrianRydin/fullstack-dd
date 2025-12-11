// src/routes/inventory.routes.ts
import { Router, Response, NextFunction } from "express"
import Inventory from "../models/Inventory"
import { authApiKey } from "../middlewares/authApiKey"
import { authJwt, requireRole, AuthRequest } from "../middlewares/authJwt"

const router = Router()

/* router.use(authApiKey)

router.use(authJwt)
router.use(requireRole("STAFF")) */

// GET /api/inventory
// Lista alla ingredienser + drycker
router.get(
  "/",
  async (_req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const items = await Inventory.find().sort({ name: 1 })
      return res.json(items)
    } catch (err) {
      return next(err)
    }
  }
)

// PUT /api/inventory/:id
// Uppdatera quantity
router.put(
  "/:id",
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const item = await Inventory.findById(req.params.id)

      if (!item) {
        return res.status(404).json({ message: "Item not found" })
      }

      const { quantity } = req.body

      if (quantity === undefined) {
        return res.status(400).json({ message: "Quantity is required" })
      }

      if (quantity < 0) {
        return res.status(400).json({ message: "Quantity cannot be negative" })
      }

      item.quantity = quantity

      await item.save()

      return res.json(item)
    } catch (err) {
      return next(err)
    }
  }
)

export default router
