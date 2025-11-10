// 📁 backend/src/utils/swagger.ts — конфигурация Swagger JSDoc

import swaggerJSDoc from "swagger-jsdoc"

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Delivery App API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/**/*.ts"], // 🔍 путь ко всем файлам маршрутов
})
