import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { cn } from "../../utils/cn"

const navItems = [
  { label: "Каталог", to: "/" },
  { label: "Корзина", to: "/cart" },
  { label: "Отслеживание", to: "/order/123/tracking" }
]

export const Navbar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50 min-h-[25%]">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="font-weight-[auto] font-semibold">
          🚚 DeliApp
        </Link>

        <nav className="flex items-center gap-[32px]">
          {navItems.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "text-gray-700 hover:text-blue-600 transition mx-6",
                location.pathname === to
                  ? "text-blue-600 font-semibold underline underline-offset-4"
                  : "text-gray-600"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-gray-700">Привет, {user.firstName}</span>
              <button
                onClick={logout}
                className="px-3 py-1 text-sm rounded border hover:bg-gray-100"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1 text-sm rounded border hover:bg-gray-100"
              >
                Войти
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 text-sm rounded border bg-blue-600 text-white hover:bg-blue-700"
              >
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
