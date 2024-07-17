import { configureStore } from '@reduxjs/toolkit'

import productsReducer from './slices/productSlice'
import categoryReducer from './slices/categorySlice'
import userReducer from './slices/userSlice'
import orderReducer from './slices/orderSlice'

export const store = configureStore({
  reducer: {
    productsReducer: productsReducer,
    categoryReducer: categoryReducer,
    userReducer: userReducer,
    orderReducer: orderReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch