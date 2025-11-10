import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import { loginApi, registerApi, getMe } from "../services/api"
import type { User } from "../types"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (data: any) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      getMe().then(setUser).catch(() => logout())
    }
  }, [])

  const login = async (email: string, password: string) => {
    const { token } = await loginApi(email, password)
    localStorage.setItem("token", token)
    const me = await getMe()
    setUser(me)
  }

  const register = async (data: any) => {
    const { token } = await registerApi(data)
    localStorage.setItem("token", token)
    const me = await getMe()
    setUser(me)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}