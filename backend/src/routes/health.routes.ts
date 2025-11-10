// 📁 backend/src/routes/health.routes.ts — Проверка доступности

import { Router } from "express"

const router = Router()

router.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" })
})

export default router
