// For Products

export const baseURL = "https://back-end-project-gamma.vercel.app"

export type Product = {
  _id: string
  title: string
  slug: string
  image: string 
  price: number
  categories: string[]
  description: string
  quantity: number
  sold: number
  shipping: number

}
export type initialStateProduct = {
  products: Product[]
  error: null | string
  isLoading: boolean
  searchTerm: string
  productsRequest: number
  singleProduct: Product
  cart: Product[]
  pagination:{
    currentPage: number,
    totalPages: number
  }
  itemsPerPage: number
}

// For Category
export type Category = {
  _id: string
  title: string | undefined
  slug: string
  ischecked: boolean
}
export type initialStateCategory = {
  categories: Category[]
  error: null | string
  isLoading: boolean
  filter: number[] | null
  categoryData: Category | null
}

// For Users
export type User = {
  _id: string
  firstName: string | undefined
  lastName: string | undefined
  userName: string
  email: string
  password: string
  isAdmin: boolean
  isBanned: boolean
  // orders: string[]
}

export type initialStateUser = {
  users: User[]
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  userData: User | null
}

// For Orders

export type Order = {
  _id: string
  buyer: User[]
  orderItems: {
    qty: number,
    product: Product[]
  }
  amount: number
  totalProducts: number
  status: string
}
export type initialStateOrders = {
  orders: Order[]
  error: null | string
  isLoading: boolean
}