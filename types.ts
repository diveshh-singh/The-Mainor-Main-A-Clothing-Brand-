export interface Product {
  id: number
  name: string
  price: number
  image: string
  discount: number
  category: string
  description?: string
  sizes?: string[]
  colors?: string[]
}
