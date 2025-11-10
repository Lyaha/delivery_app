# backend/Dockerfile
FROM node:20

# Рабочая директория внутри контейнера
WORKDIR /app

# Копируем зависимости и устанавливаем
COPY package*.json ./
RUN npm install

# Копируем исходники
COPY . .

# Устанавливаем глобально tsx (или можно использовать локально через npx)
RUN npm install -g tsx

# Открываем порт
EXPOSE 3000

# Запуск сервера
CMD ["tsx", "src/server.ts"]
