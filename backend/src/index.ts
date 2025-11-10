// 📁 backend/src/index.ts — точка входа в сервер

import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import cookieParser from "cookie-parser"

import { setupRoutes } from "./routes"
import { connectDB } from "./utils/db"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

setupRoutes(app)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`)
  })
})
