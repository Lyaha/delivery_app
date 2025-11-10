// 📁 backend/test/health.test.ts — Тест на GET /api/health

import request from "supertest"
import express from "express"
import healthRoutes from "../src/routes/health.routes"

describe("GET /api/health", () => {
  const app = express()
  app.use("/api", healthRoutes)

  it("should return 200 and status ok", async () => {
    const res = await request(app).get("/api/health")
    expect(res.status).toBe(200)
    expect(res.body.status).toBe("ok")
  })
})
