import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import type { Product } from "../../types"

interface Props {
  product: Product
}

export const ProductCard = ({ product }: Props) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="border rounded-xl overflow-hidden shadow-sm bg-white"
    >
      <Link to={`/product/${product.product_id}`}>
        <img
          src={product.image_url || "/placeholder.png"}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="font-bold text-blue-600">{product.unit_price.toFixed(2)} ₴</span>
            <button className="text-sm text-blue-600 hover:underline">Подробнее</button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}