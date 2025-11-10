// 📁 backend/src/routes/tracking.ts — маршруты для отслеживания доставки

import { Router } from "express"
import { requireAuth, AuthRequest } from "../middleware/auth"
import { pool } from "../utils/db"

const router = Router()

// GET /api/tracking/:shipmentId — история событий по доставке
/**
 * @openapi
 * /tracking/{shipmentId}:
 *   get:
 *     tags:
 *       - Tracking
 *     summary: Отримати історію відстеження за ID доставки
 *     parameters:
 *       - in: path
 *         name: shipmentId
 *         required: true
 */ 
router.get("/:shipmentId", requireAuth, async (req, res) => {
  const { shipmentId } = req.params
  const result = await pool.query(
    `SELECT * FROM shipmenttrackinghistory
     WHERE shipment_id = $1
     ORDER BY event_timestamp DESC`,
    [shipmentId]
  )
  res.json({ tracking: result.rows })
})

// POST /api/tracking — добавить событие (например, "In Transit")
/**
 * @openapi
 * /tracking:
 *   get:
 *     tags:
 *       - Tracking
 *     summary: Отримати історію відстеження
 *     responses:
 *       200:
 *         description: Список користувачів
 */
router.post("/", requireAuth, async (req: AuthRequest, res) => {
  const { shipmentId, statusType, statusDescription, lat, lng } = req.body

  const result = await pool.query(
    `INSERT INTO shipmenttrackinghistory
     (shipment_id, status_type, status_description, location)
     VALUES ($1, $2, $3, ST_SetSRID(ST_MakePoint($4, $5), 4326))
     RETURNING *`,
    [shipmentId, statusType, statusDescription, lng, lat] // lng, lat порядок важен!
  )

  res.status(201).json({ event: result.rows[0] })
})

export default router