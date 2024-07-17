import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState } from '../redux/store'
import { Login } from '../pages/home/Login'

export const ProtectedRoute = ()=>{
    const {isLoggedIn} = useSelector((state: RootState) => state.userReducer)
    return isLoggedIn ? <Outlet /> : <Login pathName={location.pathname} />
}