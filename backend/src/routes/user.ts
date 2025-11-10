// 📁 backend/src/routes/user.ts — защищённые маршруты пользователя

import { Router } from "express"
import { requireAuth, AuthRequest } from "../middleware/auth"
import { pool } from "../utils/db"

const router = Router()

// GET /api/user/profile
/**
 * @openapi
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Отримати всіх користувачів
 *     responses:
 *       200:
 *         description: Список користувачів
 */
router.get("/profile", requireAuth, async (req: AuthRequest, res) => {
  const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [req.userId])
  const user = result.rows[0]
  if (!user) return res.status(404).json({ message: "User not found" })
  res.json({ user })
})

export default router
