// 📁 backend/src/routes/returns.ts — маршруты для возвратов заказов

import { Router } from "express"
import { requireAuth, AuthRequest } from "../middleware/auth"
import { pool } from "../utils/db"

const router = Router()

// POST /api/returns — создать запрос на возврат
router.post("/", requireAuth, async (req: AuthRequest, res) => {
  const { orderId, reason, items } = req.body

  const result = await pool.query(
    `INSERT INTO returns (order_id, user_id, return_reason)
     VALUES ($1, $2, $3) RETURNING return_id`,
    [orderId, req.userId, reason]
  )

  const returnId = result.rows[0].return_id

  const insertItems = items.map((item: { orderItemId: number; quantity: number }) =>
    pool.query(
      `INSERT INTO returnitems (return_id, order_item_id, quantity)
       VALUES ($1, $2, $3)`,
      [returnId, item.orderItemId, item.quantity]
    )
  )

  await Promise.all(insertItems)

  res.status(201).json({ returnId })
})

// GET /api/returns — получить возвраты пользователя
// 📁 backend/src/routes/returns.ts
/**
 * @openapi
 * /api/returns:
 *   get:
 *     tags:
 *       - Returns
 *     summary: Отримати всі повернення
 *     responses:
 *       200:
 *         description: Повернення
 */
router.get("/", requireAuth, async (req: AuthRequest, res) => {
  const result = await pool.query(
    `SELECT * FROM returns WHERE user_id = $1 ORDER BY created_at DESC`,
    [req.userId]
  )
  res.json({ returns: result.rows })
})

export default router