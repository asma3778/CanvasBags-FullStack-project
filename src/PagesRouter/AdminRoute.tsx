import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState } from '../redux/store'
import { Login } from '../pages/home/Login'

export const AdmindRoute = ()=>{
    const {isLoggedIn, userData} = useSelector((state: RootState) => state.userReducer)
    return isLoggedIn && userData?.isAdmin ? <Outlet /> : <Login pathName={location.pathname} />
}