// 📁 backend/src/config/cors.ts — Настройка CORS

import cors from "cors"

const allowedOrigins = [
  "http://localhost:5173", // клиент
  "http://localhost:5174", // интерфейс работников
]

export const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
}
