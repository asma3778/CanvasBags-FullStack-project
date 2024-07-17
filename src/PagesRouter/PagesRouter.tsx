import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ProductDetails } from "../pages/home/ProductDetails";
import { Home } from "../pages/home/Home";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { UserDashboard } from "../pages/user/UserDashboard";
// import { AdminOrders } from "../components/admin/AdminOrders";
import { NavBar } from "../components/Navbar";
import { Error } from "../pages/home/Error";
import { UserProfile } from "../pages/user/UserProfile";
import { UserList } from "../components/admin/UserList";
import { Login } from "../pages/home/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdmindRoute } from "./AdminRoute";
import { Register } from "../pages/home/Register";
import { Cart } from "../pages/user/Cart";
import { ManageProducts } from "../components/admin/ManageProducts";
import Activate from "../pages/home/activate";
import { ManageCategory } from "../components/admin/ManageCategory";
import { ForgetPassword } from "../pages/home/forgetPassword";
import { ResetPassword } from "../pages/home/resetPassword";

export const Routers = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product" element={<ProductDetails />} />
                <Route path="/auth/login" element={<Login pathName={''} />} />
                <Route path="/logout" element={<Home />} />
                <Route path="/process-register" element={<Register />} />
                <Route path="/products/:slug" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="users/activate/:token" element={<Activate />} />
                <Route path="/dashboard/forget-password" element={<ForgetPassword />} />
                <Route path="/users/rest-password/:token" element={<ResetPassword />} />
                {/* Admin */}
                <Route path="/dashboard" element={<AdmindRoute />} />
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="admin/category" element={<ManageCategory />} />
                {/* <Route path="admin/orders" element={<AdminOrders />} /> */}
                <Route path="admin/products" element={<ManageProducts />} />
                <Route path="admin/users" element={<UserList />} />
                {/* User */}
                <Route path="/dashboard" element={<ProtectedRoute />} />
                <Route path="user" element={<UserDashboard />} />
                <Route path="user/profile" element={<UserProfile />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    )
}