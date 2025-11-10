import axios from "axios"
import type { Product, User } from "../types"

const api = axios.create({
  baseURL: "http://localhost:5000/api",
})

// Подставляем токен авторизации
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// 📦 Товары
export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get("/products")
  return res.data
}

export const getProductById = async (id: string): Promise<Product> => {
  const res = await api.get(`/products/${id}`)
  return res.data
}

// 🔐 Аутентификация
export const loginApi = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password })
  return res.data
}

export const registerApi = async (data: any) => {
  const res = await api.post("/auth/register", data)
  return res.data
}

export const getMe = async (): Promise<User> => {
  const res = await api.get("/auth/me")
  return res.data
}

// 🚚 Трекинг заказа
export const getTrackingInfo = async (orderId: string) => {
  const res = await api.get(`/shipments/${orderId}/tracking`)
  return res.data
}

export default api
