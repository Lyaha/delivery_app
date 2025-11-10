// 📁 backend/src/routes/orders.ts — маршруты для заказов

import { Router } from "express"
import { requireAuth, AuthRequest } from "../middleware/auth"
import { pool } from "../utils/db"

const router = Router()

// GET /api/orders — получить заказы текущего пользователя


// 📁 backend/src/routes/orders.ts
/**
 * @openapi
 * /api/orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Отримати всі замовлення
 *     responses:
 *       200:
 *         description: Список замовлень
 */
router.get("/", requireAuth, async (req: AuthRequest, res) => {
  const result = await pool.query(
    `SELECT order_id, order_date, total_amount, status, payment_status
     FROM orders
     WHERE user_id = $1
     ORDER BY order_date DESC`,
    [req.userId]
  )
  res.json({ orders: result.rows })
})

// GET /api/orders/:id — получить подробности заказа по ID
router.get("/:id", requireAuth, async (req: AuthRequest, res) => {
  const orderId = req.params.id
  const order = await pool.query(
    `SELECT * FROM orders WHERE order_id = $1 AND user_id = $2`,
    [orderId, req.userId]
  )
  if (order.rows.length === 0) return res.status(404).json({ message: "Order not found" })

  const items = await pool.query(
    `SELECT oi.*, p.name, p.sku FROM orderitems oi
     JOIN products p ON p.product_id = oi.product_id
     WHERE oi.order_id = $1`,
    [orderId]
  )

  res.json({ order: order.rows[0], items: items.rows })
})

export default router
