// 📁 backend/src/middleware/auth.ts — Middleware для защиты маршрутов

import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "insecure_default"

export interface AuthRequest extends Request {
  userId?: number
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" })
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: number }
    req.userId = payload.userId
    next()
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}