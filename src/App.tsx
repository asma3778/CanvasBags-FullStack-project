import {useEffect} from 'react'
import { useDispatch } from 'react-redux'

import { Routers } from './PagesRouter/PagesRouter'
import { AppDispatch } from './redux/store'
import { fetchCategories } from './redux/slices/categorySlice'
// import { fetchOrders } from './redux/slices/orderSlice'
import { fetchProductsAdmin } from './redux/slices/productSlice'
import { fetchUsers } from './redux/slices/userSlice'



export const App =()=> {
  const dispatch: AppDispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchCategories())
    // dispatch(fetchOrders())
    dispatch(fetchProductsAdmin())
    dispatch(fetchUsers())
  },[])
  
  return (
    <>
    <Routers/>
    </>
  )
}