// 📁 backend/src/server.ts — точка входа

import express from "express"
import cors from "cors"
import morgan from "morgan"
import { setupRoutes } from "./setupRoutes"
import { swaggerSpec } from "./utils/swagger"
import swaggerUi from "swagger-ui-express"
import { corsOptions } from "./config/cors"
import { errorHandler } from "./middleware/errorHandler"
import healthRoutes from "./routes/health.routes"

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(cors(corsOptions))
app.use(express.json())
app.use(errorHandler)


// 📄 Swagger UI на /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use("/api", healthRoutes)

// 📦 Основные API-маршруты
setupRoutes(app)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
})
