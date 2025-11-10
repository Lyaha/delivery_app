// 📁 backend/src/setupRoutes.ts — точка подключения всех маршрутов

import { Express } from "express"
import authRoutes from "./routes/auth"
import userRoutes from "./routes/user"
import adminRoutes from "./routes/admin"
import courierRoutes from "./routes/courier"
import ordersRoutes from "./routes/orders"
import shipmentsRoutes from "./routes/shipments"
import returnsRoutes from "./routes/returns"
import trackingRoutes from "./routes/tracking"

export function setupRoutes(app: Express) {
  app.use("/api/auth", authRoutes)
  app.use("/api/user", userRoutes)
  app.use("/api/admin", adminRoutes)
  app.use("/api/courier", courierRoutes)
  app.use("/api/orders", ordersRoutes)
  app.use("/api/shipments", shipmentsRoutes)
  app.use("/api/returns", returnsRoutes)
  app.use("/api/tracking", trackingRoutes)

  // ✅ Все основные маршруты подключены
}
