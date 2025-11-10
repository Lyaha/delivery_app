// 📁 staff-frontend/src/components/ui/Navbar.tsx — верхняя панель навигации
import React from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "../../utils/cn"

const links = [
  { to: "/", label: "🏠 Главная" },
  { to: "/orders", label: "📦 Заказы" },
  { to: "/profile", label: "👤 Профиль" },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <span className="font-bold text-lg">Staff Panel</span>
        <nav className="space-x-4">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "text-sm px-3 py-1.5 rounded transition-colors",
                pathname === to ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
