// 📁 staff-frontend/src/App.tsx — корневой компонент с маршрутизацией и auth check
import React from "react"
import { Route, Routes, useLocation, Navigate } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import DashboardPage from "./pages/DashboardPage"
import OrdersPage from "./pages/OrdersPage"
import ProfilePage from "./pages/ProfilePage"
import LoginPage from "./pages/LoginPage"
import Navbar from "./components/ui/Navbar"

const isAuthenticated = true

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      {isAuthenticated && <Navbar />}
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/orders"
          element={isAuthenticated ? <OrdersPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </AnimatePresence>
  )
}