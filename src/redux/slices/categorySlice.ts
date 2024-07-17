import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Category, baseURL, initialStateCategory } from '../../types/types'
import axios from 'axios'
import api from '../../api'

const initialState: initialStateCategory = {
  categories: [],
  error: null,
  isLoading: false,
  filter: null,
  categoryData: null
}

export const fetchCategories = createAsyncThunk("Category/fetchCategories", async () => {
  try {
    const response = await api.get(`${baseURL}/categories`)
    return response.data.payload
  } catch (error) {
    throw new Error('Failed to fetch Categories')
  }
})

export const deleteCategory = async (slug: string) => {
  try {
    const response = await api.delete(`${baseURL}/categories/${slug}`)
    return response.data.payload
  } catch (error) {
    throw new Error(`Failed to delete Category with this slug ${slug}`)
  }
}

export const createCategory = createAsyncThunk("category/createCategory", async (title: string) => {
  try {
    const response = await api.post(`${baseURL}/categories`, { title: title })
    console.log(response)
    return response.data
  } catch (error) {
    throw new Error(`Failed to delete Category with this slug ${title}`)
  }
})

export const updateCategory = createAsyncThunk("category/updateCategory",
  async (categoryData: Partial<Category>) => {
    try {
      const response = await api.put(`${baseURL}/categories/${categoryData.slug}`, { title: categoryData.title })
      return categoryData
    } catch (error) {
      throw new Error(`Failed to delete Category with this slug ${categoryData.slug}`)
    }
  })

export const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Error"
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload.payload)
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const { slug, title } = action.payload
        const foundCategory = state.categories.find((category) => category.slug === slug)
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
})

export default categorySlice.reducer