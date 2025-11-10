// 📁 backend/src/routes/auth.ts — маршруты для аутентификации

import { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { pool } from "../utils/db"

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || "insecure_default"

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body

  if (!email || !password || !firstName || !lastName || !phoneNumber) {
    return res.status(400).json({ message: "All fields are required" })
  }

  const existing = await pool.query("SELECT * FROM users WHERE email = $1", [email])
  if (existing.rows.length > 0) {
    return res.status(400).json({ message: "Email already registered" })
  }

  const hashed = await bcrypt.hash(password, 10)
  const newUser = await pool.query(
    `INSERT INTO users (first_name, last_name, email, password_hash, phone_number)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [firstName, lastName, email, hashed, phoneNumber]
  )

  res.status(201).json({ message: "Registered", user: newUser.rows[0] })
})

// POST /api/auth/login
// 📁 backend/src/routes/auth.ts
/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Авторизація користувача
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Успішна авторизація
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body

  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email])
  const user = result.rows[0]
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: "7d" })
  res.cookie("token", token, { httpOnly: true, sameSite: "lax" })
  res.json({ message: "Logged in", user })
})

// POST /api/auth/logout
router.post("/logout", (_req, res) => {
  res.clearCookie("token")
  res.json({ message: "Logged out" })
})

export default router