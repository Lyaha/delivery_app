// 📁 backend/src/routes/shipments.ts — маршруты для доставок

import { Router } from "express"
import { requireAuth, AuthRequest } from "../middleware/auth"
import { pool } from "../utils/db"

const router = Router()

// GET /api/shipments/:orderId — отслеживание доставки по заказу
router.get("/:orderId", requireAuth, async (req: AuthRequest, res) => {
  const orderId = req.params.orderId

  const shipmentResult = await pool.query(
    `SELECT s.*, a.city AS destination_city
     FROM shipments s
     JOIN addresses a ON s.destination_address_id = a.address_id
     WHERE s.order_id = $1`,
    [orderId]
  )

  const shipment = shipmentResult.rows[0]
  if (!shipment) return res.status(404).json({ message: "Shipment not found" })

  const trackingResult = await pool.query(
    `SELECT * FROM shipmenttrackinghistory
     WHERE shipment_id = $1
     ORDER BY event_timestamp DESC`,
    [shipment.shipment_id]
  )

  res.json({ shipment, trackingHistory: trackingResult.rows })
})

export default router
