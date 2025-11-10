// 📁 staff-frontend/src/pages/ProfilePage.tsx — заглушка профиля сотрудника
import React from "react"

export default function ProfilePage() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Профиль сотрудника</h1>
      <div className="bg-white p-4 rounded-lg shadow-md space-y-2">
        <p><span className="font-semibold">Имя:</span> Иван Работяга</p>
        <p><span className="font-semibold">Роль:</span> Курьер</p>
        <p><span className="font-semibold">Email:</span> courier@example.com</p>
      </div>
    </div>
  )
}
