// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Button } from "@mui/material";

// import { AppDispatch, RootState } from "../../redux/store";
// import { AdminSidebar } from "./AdminSidebar";
// import { deleteOrder, fetchOrders } from "../../redux/slices/orderSlice";

// export const UserOrders = () => {
//   const dispatch = useDispatch<AppDispatch>()
//   const state = useSelector((state: RootState) => state)
//   const orders = state.orderReducer

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
//       <div className="main-content">Main Content for Orders
//         {orders.isLoading && <h3> Loading Orders...</h3>}
//       </div>
//       <div className="cards">
//         {orders.orders.map((order) => (
//           <div>
//             <h2>{order._id}</h2>
//             <h4>{order.orderItems.qty}</h4>
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