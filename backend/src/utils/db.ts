// 📁 backend/src/utils/db.ts — подключение к PostgreSQL

import { Pool } from "pg"
import dotenv from "dotenv"

dotenv.config()

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

export async function connectDB() {
  try {
    await pool.query("SELECT 1")
    console.log("✅ PostgreSQL connected")
  } catch (err) {
    console.error("❌ Failed to connect to database:", err)
    process.exit(1)
  }
}
