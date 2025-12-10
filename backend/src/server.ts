// src/server.ts
import express, { Application, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import { connectDB } from "./config/db"
import { cspMiddleware } from "./middlewares/csp"
import { errorHandler } from "./middlewares/errorHandler"
import authRoute from "./routes/auth.route"
import userRoute from "./routes/user.route"
import menuRoute from "./routes/menuItem.route"
import ordersRoute from "./routes/order.route"
import InventoryRoute from "./routes/inventory.route"

dotenv.config()

const app: Application = express()

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(cspMiddleware)
app.get("/", (_req: Request, res: Response) => {
  res.send("Umami API is running ")
})

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/menu", menuRoute)
app.use("/api/orders", ordersRoute)
app.use("/api/inventory", InventoryRoute)
app.use(errorHandler)

const PORT = Number(process.env.PORT) || 4000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
