import { useState } from "react"
import { useCart } from "../contexts/CartContext"
import { PageTitle } from "../components/ui/PageTitle"

export default function CheckoutPage() {
  const { total, clear } = useCart()
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [payment, setPayment] = useState("cash")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !address) return
    setSubmitted(true)
    clear()
  }

  if (submitted)
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold mb-2">🎉 Заказ оформлен!</h2>
        <p>Мы свяжемся с вами для подтверждения доставки.</p>
      </div>
    )

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <PageTitle>Оформление заказа</PageTitle>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Ваше имя</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Адрес доставки</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Способ оплаты</label>
          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="cash">Наложенный платеж</option>
            <option value="card">Карта онлайн</option>
          </select>
        </div>
        <div className="flex justify-between items-center border-t pt-4">
          <p className="font-semibold">Итого: {total.toFixed(2)} ₴</p>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Подтвердить заказ
          </button>
        </div>
      </form>
    </div>
  )
}
