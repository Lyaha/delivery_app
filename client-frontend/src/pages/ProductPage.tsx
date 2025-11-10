import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProductById } from "../services/api"
import { PageTitle } from "../components/ui/PageTitle"

export default function ProductPage() {
  const { id } = useParams()
  const {
    data: product,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id!)
  })

  if (isLoading) return <p className="text-center py-10">Загрузка товара...</p>
  if (isError || !product) return <p className="text-center py-10 text-red-500">Ошибка загрузки товара.</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <img
        src={product.image_url || "/placeholder.png"}
        alt={product.name}
        className="w-full h-[400px] object-cover rounded"
      />
      <div className="space-y-4">
        <PageTitle>{product.name}</PageTitle>
        <p className="text-gray-700">{product.description}</p>
        <p className="text-xl font-bold text-blue-600">{product.unit_price.toFixed(2)} ₴</p>
        <button className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
          Добавить в корзину
        </button>
      </div>
    </div>
  )
}