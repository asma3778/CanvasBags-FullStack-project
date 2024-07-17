// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Button } from "@mui/material";

// import { AppDispatch, RootState } from "../../redux/store";
// import { AdminSidebar } from "./AdminSidebar";
// import { deleteOrder, fetchOrders } from "../../redux/slices/orderSlice";

// export const AdminOrders = () => {

//   const dispatch = useDispatch<AppDispatch>()
//   const orders = useSelector((state: RootState) => state.orderReducer)

//   useEffect(() => {
//     dispatch(fetchOrders())
//   }, [])

//   const handleDelete = async (id: string) => {
//     try {
//       const response = await deleteOrder(id)
//       dispatch(fetchOrders())
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <div>
//       <AdminSidebar />
//       <div className="main-content">
//         {orders.isLoading && <h3> Loading Orders...</h3>}
//       </div>
//       <div className="general-content">
//         {orders.orders.map((order) => (
//           <div key={order._id}>
//             <h2>{order._id}</h2>
//             <h4>{order.orderItems.qty}</h4>
//             <h4>{order.status}</h4>
//             <p>{order.totalProducts}</p>
//             <Button
//               onClick={() => handleDelete(order._id)}>
//               Remove
//             </Button>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// };