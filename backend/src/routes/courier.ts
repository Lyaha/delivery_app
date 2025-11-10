// 📁 backend/src/routes/courier.ts — маршруты для курьеров

import { Router } from "express"
import { requireAuth, AuthRequest } from "../middleware/auth"
import { pool } from "../utils/db"

const router = Router()

// GET /api/courier/profile — получить профиль курьера
// 📁 backend/src/routes/courier.ts
/**
 * @openapi
 * /api/courier/assignments:
 *   get:
 *     tags:
 *       - Courier
 *     summary: Отримати всі призначення курʼєра
 *     responses:
 *       200:
 *         description: Призначення курʼєра
 */
router.get("/profile", requireAuth, async (req: AuthRequest, res) => {
  const result = await pool.query(
    `SELECT u.user_id, u.first_name, u.last_name, u.email, c.vehicle_type, c.is_available
     FROM couriers c
     JOIN users u ON u.user_id = c.user_id
     WHERE c.user_id = $1`,
    [req.userId]
  )

  const courier = result.rows[0]
  if (!courier) return res.status(404).json({ message: "Courier not found" })
  res.json({ courier })
})

export default router