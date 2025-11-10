export interface Product {
  product_id: number
  name: string
  description: string
  unit_price: number
  sku?: string
  image_url?: string
  quantity_in_stock?: number
}

export interface User {
  user_id: number
  firstName: string
  lastName: string
  email: string
  role?: string
}
