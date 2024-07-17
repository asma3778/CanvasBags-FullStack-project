import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded"

import { AppDispatch, RootState } from "../../redux/store";
import { banUser, deleteUser, fetchUsers, unBanUser } from "../../redux/slices/userSlice";
import { AdminSidebar } from "./AdminSidebar";

export const UserList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { users, isLoading } = useSelector((state: RootState) => state.userReducer)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const handleDelete = async (userName: string) => {
    try {
      await dispatch(deleteUser(userName))
    } catch (error) {
      console.log(error)
    }
  }

  const handleBanUnBan = (userName: string) => {
    users.map((user) => {
      !user.isBanned ? banUser(userName) : unBanUser(userName)
    })
    dispatch(fetchUsers())
  }

  // if (isLoading) {
  //   return <p>Loading Users...</p>
  // }
  return (
    <div>
      <AdminSidebar />
      <div className="main-content">
      </div>
      <div className='general-content-category'>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <Table className="table-category">
            <TableHead>
              <TableRow>
                <TableCell align="left">User ID</TableCell>
                <TableCell align="left">User Name</TableCell>
                <TableCell align="left">User User Name</TableCell>
                <TableCell align="left">User Email</TableCell>
                <TableCell align="left">User Status</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 &&
                users.map((user) => {
                  if (!user.isAdmin) {
                    return (
                      <TableRow
                        key={user._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" align="left">
                          {user._id}</TableCell>
                        <TableCell component="th" scope="row" align="left">
                          {`${user.firstName} ${user.lastName}`}
                        </TableCell>
                        <TableCell align="left">{user.userName}</TableCell>
                        <TableCell align="left">{user.email}</TableCell>
                        <TableCell align="left">
                          <Button

                            onClick={() => {
                              handleBanUnBan(user.userName)
                            }}>
                            {user.isBanned ? 'unbanned' : 'banned'}
                          </Button>
                        </TableCell>
                        <TableCell align="left">
                          <DeleteRoundedIcon onClick={() => handleDelete(user.userName)} />
                        </TableCell>
                      </TableRow>
                    )
                  }
                })}
            </TableBody>
          </Table>
        </Box>
      </div>
    </div>
  )
}    