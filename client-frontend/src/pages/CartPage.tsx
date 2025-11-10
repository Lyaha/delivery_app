import { Link } from "react-router-dom"
import { PageTitle } from "../components/ui/PageTitle"
import { useCart } from "../contexts/CartContext"

export default function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart()

  if (items.length === 0)
    return <p className="text-center py-10">Корзина пуста.</p>

  return (
    <div className="space-y-6">
      <PageTitle>Корзина</PageTitle>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.product_id} className="border rounded-lg p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src={item.image_url || "/placeholder.png"} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">{item.unit_price.toFixed(2)} ₴ x {item.quantity}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => updateQuantity(item.product_id, parseInt(e.target.value))}
                className="w-16 border rounded px-2 py-1 text-sm"
              />
              <button onClick={() => removeItem(item.product_id)} className="text-red-500 text-sm hover:underline">
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center border-t pt-4">
        <p className="text-lg font-bold">Итого: {total.toFixed(2)} ₴</p>
        <Link
          to="/checkout"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Перейти к оформлению
        </Link>
      </div>
    </div>
  )
}
