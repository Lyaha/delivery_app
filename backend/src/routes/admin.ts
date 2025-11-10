// 📁 backend/src/routes/admin.ts — маршруты администратора

import { Router } from "express"
import { requireAuth, AuthRequest } from "../middleware/auth"
import { pool } from "../utils/db"

const router = Router()

// GET /api/admin/users — получить список всех пользователей
// 📁 backend/src/routes/admin.ts
/**
 * @openapi
 * /api/admin/stats:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Отримати статистику системи
 *     responses:
 *       200:
 *         description: Статистика
 */
router.get("/users", requireAuth, async (req: AuthRequest, res) => {
  const result = await pool.query("SELECT user_id, first_name, last_name, email, is_active, created_at FROM users ORDER BY created_at DESC")
  res.json({ users: result.rows })
})

export default router