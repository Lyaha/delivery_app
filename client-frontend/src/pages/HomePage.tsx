import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../services/api"
import { ProductCard } from "../components/product/ProductCard"
import { PageTitle } from "../components/ui/PageTitle"

export default function HomePage() {
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts
  })

  if (isLoading) return <p className="text-center py-10">Загрузка товаров...</p>
  if (isError) return <p className="text-center py-10 text-red-500">Ошибка загрузки товаров.</p>

  return (
    <div>
      <PageTitle>Каталог товаров</PageTitle>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  )
}