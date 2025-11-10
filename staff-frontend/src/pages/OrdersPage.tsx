// 📁 staff-frontend/src/pages/OrdersPage.tsx — заглушка со списком заказов
import React from "react"
import { useEffect, useState } from "react"

interface Order {
  id: string
  customerName: string
  address: string
  status: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // 🧪 Заглушка данных
    setOrders([
      {
        id: "1",
        customerName: "Иван Иванов",
        address: "ул. Ленина, 10",
        status: "готовится",
      },
      {
        id: "2",
        customerName: "Анна Смирнова",
        address: "пр-т Мира, 55",
        status: "в пути",
      },
    ])
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Текущие заказы</h1>
      <div className="grid gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border p-4 rounded-lg shadow-sm bg-white"
          >
            <h2 className="text-lg font-medium">Заказ #{order.id}</h2>
            <p className="text-sm text-gray-600">Клиент: {order.customerName}</p>
            <p className="text-sm text-gray-600">Адрес: {order.address}</p>
            <p className="text-sm text-blue-600">Статус: {order.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}