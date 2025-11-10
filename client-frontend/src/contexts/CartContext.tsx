import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import type { Product } from "../types"

export interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  total: number
  addItem: (product: Product) => void
  updateQuantity: (productId: number, quantity: number) => void
  removeItem: (productId: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) setItems(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product_id === product.product_id)
      if (existing) {
        return prev.map((i) =>
          i.product_id === product.product_id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (productId: number, quantity: number) => {
    setItems((prev) =>
      prev.map((i) => (i.product_id === productId ? { ...i, quantity } : i))
    )
  }

  const removeItem = (productId: number) => {
    setItems((prev) => prev.filter((i) => i.product_id !== productId))
  }

  const clear = () => setItems([])

  const total = items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, total, addItem, updateQuantity, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}