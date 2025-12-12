import type { Request } from "express"
import { Router, Response, NextFunction } from "express"
import Order, { IOrder } from "../models/Order"
import MenuItem from "../models/MenuItem"
import { authApiKey } from "../middlewares/authApiKey"
import {
  authJwt,
  optionalAuthJwt,
  requireRole,
  AuthRequest,
} from "../middlewares/authJwt"
import { deductInventory } from "../services/inventoryDeduction"

const router = Router()
router.use(authApiKey)

/*Skapa order för gäst eller inloggad kund */
router.post(
  "/",
  optionalAuthJwt,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log("POST /api/orders hit")
    try {
      const { items, customerName, customerPhone } = req.body as {
        items?: { menuItemId: string; qty: number }[]
        customerName?: string
        customerPhone?: string
      }

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Order items are required" })
      }

      const itemIds = items.map((i) => i.menuItemId)
      const menuItems = await MenuItem.find({ _id: { $in: itemIds } })

      const orderItems = items.map((i) => {
        const menuItem = menuItems.find(
          (m) => m._id.toString() === i.menuItemId
        )
        if (!menuItem) {
          throw new Error("Menu item not found")
        }

        return {
          menuItemId: menuItem._id,
          name: menuItem.name,
          price: menuItem.price,
          qty: i.qty,
        }
      })

      const totalPrice = orderItems.reduce((sum, i) => sum + i.price * i.qty, 0)

      const orderData: Partial<IOrder> = {
        items: orderItems,
        totalPrice,
        customerName,
        customerPhone,
      }

      if (req.user?.id) {
        orderData.customerId = req.user.id as any
      }

      const order = await Order.create(orderData)

      return res.status(201).json(order)
    } catch (err) {
      return next(err)
    }
  }
)

/* Inloggad kund ser sina orders*/
router.get(
  "/my",
  authJwt,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const orders = await Order.find({ customerId: req.user!.id }).sort({
        createdAt: -1,
      })

      return res.json(orders)
    } catch (err) {
      return next(err)
    }
  }
)

/*Kund avbryter sin egen order det är endast PENDING*/
router.post(
  "/:id/cancel",
  optionalAuthJwt, // kan vara kvar, men används inte i logiken
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({ message: "Order not found" })
      }

      console.log(
        "Cancel request for order",
        order._id.toString(),
        "current status:",
        order.status
      );

      if (order.status !== "PENDING") {
        return res.status(400).json({
          message: `Order can no longer be cancelled (status is ${order.status})`,
        });
      }

      order.status = "CANCELLED";
      await order.save();

      return res.json(order)
    } catch (err) {
      return next(err)
    }
  }
)

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }
    return res.json(order)
  } catch (err) {
    return next(err)
  }
})

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    if (order.status !== "PENDING") {
      return res
        .status(400)
        .json({ message: "Order can no longer be modified" })
    }

    const { items } = req.body as {
      items?: { menuItemId: string; qty: number }[]
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Updated items are required" })
    }

    // samma logik som i POST / plocka priser från meny, räkna total
    const itemIds = items.map((i) => i.menuItemId);
    const menuItems = await MenuItem.find({ _id: { $in: itemIds } });

    const orderItems = items.map((i) => {
      const menuItem = menuItems.find((m) => m._id.toString() === i.menuItemId)
      if (!menuItem) {
        throw new Error("Menu item not found")
      }

      return {
        menuItemId: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        qty: i.qty,
      }
    })

    const totalPrice = orderItems.reduce((sum, i) => sum + i.price * i.qty, 0)

    order.items = orderItems as any
    order.totalPrice = totalPrice

    await order.save()

    return res.json(order)
  } catch (err) {
    return next(err)
  }
})

// Här börjar personal routes STAFF/ADMIN
router.use(authJwt)
router.use(requireRole("STAFF"))

// Personal ser alla aktuella ej CANCELLED
router.get(
  "/",
  async (_req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const orders = await Order.find({
        status: { $ne: "CANCELLED" },
      }).sort({ createdAt: 1 })

      return res.json(orders)
    } catch (err) {
      return next(err)
    }
  }
)

router.post(
  "/:id/lock",
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const order = await Order.findById(req.params.id)
      if (!order) {
        return res.status(404).json({ message: "Order not found" })
      }

      if (order.status !== "PENDING") {
        return res.status(400).json({ message: "Order cannot be locked" })
      }

      order.status = "LOCKED"
      await order.save()
      return res.json(order)
    } catch (err) {
      return next(err)
    }
  }
)

router.post(
  "/:id/ready",
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const order = await Order.findById(req.params.id)
      if (!order) {
        return res.status(404).json({ message: "Order not found" })
      }

      if (order.status !== "LOCKED") {
        return res.status(400).json({ message: "Order must be locked first" })
      }

      //Inventory ändras precis innan en order sätts till READY
      await deductInventory(order)

      order.status = "READY"
      await order.save()
      return res.json(order)
    } catch (err) {
      return next(err)
    }
  }
)

router.post(
  "/:id/cancel-staff",
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const order = await Order.findById(req.params.id)
      if (!order) {
        return res.status(404).json({ message: "Order not found" })
      }

      if (order.status === "LOCKED" || order.status === "CANCELLED") {
        return res
          .status(400)
          .json({ message: "Order cannot be cancelled in this state" })
      }

      order.status = "CANCELLED"
      if (order.paymentStatus === "PAID") {
        order.paymentStatus = "REFUNDED"
      }
      await order.save()

      return res.json(order)
    } catch (err) {
      return next(err)
    }
  }
)

export default router
