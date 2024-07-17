import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../api'
import { Order, baseURL, initialStateOrders } from '../../types/types'
import axios from 'axios'

const initialState: initialStateOrders = {
  orders: [],
  error: null,
  isLoading: false,
}

// export const fetchOrders = createAsyncThunk("UserOrders/fetchOrders", async () => {
//   try {
//     const response = await axios.get(`${baseURL}/orders`)
//     return response.data.payload.orders
//   } catch (error) {
//     throw new Error('Failed to fetch orders')
//   }
// })

// export const deleteOrder = async (id: string) => {
//   try {
//     const response = await axios.delete(`${baseURL}/orders/${id}`)
//     return response.data.payload.orders
//   } catch (error) {
//     throw new Error(`Failed to delete order with is id ${id}`)
//   }
// }

export const orderSlice = createSlice({
  name: 'Order',
  initialState: initialState,
  reducers: {
    ordersRequest: (state) => {
      state.isLoading = true
    },
    ordersSuccess: (state, action) => {
      state.isLoading = false
      state.orders = action.payload
    },
    addOrder: (state, action: { payload: { order: Order } }) => {

      state.orders = [action.payload.order, ...state.orders]
    },
  },
  extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchOrders.pending, (state) => {
  //       state.isLoading = true
  //       state.error = null
  //     })
  //     .addCase(fetchOrders.fulfilled, (state, action: any) => {
  //       state.isLoading = false
  //       state.orders = action.payload
  //     })
  //     .addCase(fetchOrders.rejected, (state, action) => {
  //       state.isLoading = false
  //       state.error = action.error.message || "Error"
  //     })
  }
})

export const { addOrder, ordersRequest, ordersSuccess } = orderSlice.actions
export default orderSlice.reducer