import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import api from '../../api'
import { Product, baseURL, initialStateProduct } from '../../types/types'
import axios from 'axios'

export const fetchProductsAdmin = createAsyncThunk("product/fetchProducts", async () => {
  try {
    const response = await api.get(`${baseURL}/products`)
    const products = response.data.payload.products
    return products;
  } catch (error) {
    throw new Error('Failed to fetch products')
  }
})

export const fetchProducts = createAsyncThunk("product/fetchProducts", async (pagination: { page: number; limit: number }) => {
  try {
    const response = await api.get(`${baseURL}/products/?page=${pagination.page}&limit=${pagination.limit}`)
    const products = response.data.payload.products
    return products;
  } catch (error) {
    throw new Error('Failed to fetch products')
  }
})

export const deleteProduct = async (slug: string) => {
  try {
    const response = await api.delete(`${baseURL}/products/${slug}`)
    const products = response.data.payload.products
    return products;
  } catch (error) {
    throw new Error(`Failed to delete product with is slug ${slug}`)
  }
}

export const findProductBySlug = createAsyncThunk(
  'product/findProductBySlug',
  async (slug: string | undefined) => {
    const response = await api.get(`${baseURL}/products/${slug}`)
    return response.data.payload
  }
)

export const createProduct = async (newProduct: FormData) => {
  try {
    const response = await api.post(`${baseURL}/products`, newProduct
      , {
        headers: {
          'content-Type': 'multipart/form-data'
        }
      }
    )
    const products = response.data
    return products;
  } catch (error) {
    throw new Error('Failed to create product')
  }
}

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (productData: Partial<Product>) => {
    try {
      const response = await api.put(`${baseURL}/products/${productData.slug}`,
        { title: productData.title })
      return response.data.payload
    } catch (error) {
      console.error('Error during product update:', error)
      throw error
    }
  })

export const sortProducts = createAsyncThunk(
  'product/sortProducts',
  async (sortValue: string) => {
    try {
      const { data } = await api.get(`${baseURL}products/?sort=${sortValue}`)
      return data
    } catch (error) {
      throw new Error('Failed to sort product')
    }
  }
)

const initialState: initialStateProduct = {
  products: [],
  error: null,
  isLoading: false,
  searchTerm: '',
  productsRequest: 0,
  singleProduct: {} as Product,
  cart: [],
  pagination: {
    currentPage: 0,
    totalPages: 0
  },
  itemsPerPage: 0,
}

export const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    searchProduct: (state, action) => {
      state.searchTerm = action.payload
    },
    addItemCart: (state, action) => {
      const item = action.payload
      if (item) {
        state.cart = [...state.cart, item]
      }
    },
    filterProducts: (state, action) => {
      const sortingOption = action.payload
      if (sortingOption === 'name') {
        state.products.sort((product1, product2) =>
          product1.title.localeCompare(product2.title)
        )
      } else if (sortingOption === 'price')
        state.products.sort((product1, product2) => product1.price - product2.price)
    },
    deleteItemCart: (state, action) => {
      state.cart = action.payload
    },
    deletetAllCart: (state) => {
      state.cart = []
      localStorage.removeItem('cart')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action: any) => {
        state.isLoading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Error"
      })
      .addCase(findProductBySlug.fulfilled, (state, action) => {
        state.singleProduct = action.payload
      })
      .addCase(sortProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload.payload
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const { slug, title } = action.payload
        const foundCategory = state.products.find((product) => product.slug === slug)
        if (foundCategory) {
          foundCategory.title = title
        }
      })

      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true
          state.error = null
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {

          state.isLoading = false
          state.error = action.error.message || 'an error occured'
        }
      )
  }
});

export const { searchProduct,
  addItemCart, deleteItemCart, setPage, filterProducts,
  deletetAllCart
} = productSlice.actions
export default productSlice.reducer