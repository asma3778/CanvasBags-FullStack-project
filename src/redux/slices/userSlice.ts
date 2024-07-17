import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
axios.defaults.withCredentials = true

import axios from 'axios'
import { User, baseURL, initialStateUser } from '../../types/types'
import api from '../../api'


export const fetchUsers = createAsyncThunk("User/fetchUsers", async () => {
  try {
    const response = await api.get(`${baseURL}/users`)
    return response.data.payload.users
  } catch (error) {
    throw new Error('Failed to fetch users')
  }
})

export const deleteUser = createAsyncThunk("User/deleteUser", async (userName: string) => {
  try {
    const response = await api.delete(`${baseURL}/users/${userName}`)
    console.log(response.data)
    return response.data.payload.users
  } catch (error) {
    throw new Error(`Failed to delete user with this user name ${userName}`)
  }
})

export const updateTheUser = createAsyncThunk('User/updateTheUser',
 async (usersData: Partial<User>) => {
  try {
    const response = await api.put(`${baseURL}/users/${usersData.userName}`, usersData
    //  {firstName: usersData.firstName, lastName: usersData.lastName}
     )
    console.log(usersData)
    console.log(response.data)

    return usersData
  } catch (error) {
    throw new Error('Failed to update user')
  }
})

export const banUser = async (userName: string) => {
  try {
    const response = await api.put(`${baseURL}/users/updateBan/${userName}`)
    return response.data
  } catch (error) {
    throw new Error(`Failed to ban user with this user name ${userName}`)
  }
}

export const unBanUser = async (userName: string) => {
  try {
    const response = await api.put(`${baseURL}/users/updateBan/${userName}`)
    return response.data
  } catch (error) {
    throw new Error(`Failed to unban user with this user name ${userName}`)
  }
}

export const registerUser = async (user: object) => {
  // try {
    const response = await api.post(`${baseURL}/users/process-register`, user)
    console.log(response.data);
    
    return response.data
  // } catch (error) {
  //   throw new Error('Failed to create user')
  // }
}

export const activateUser = createAsyncThunk("Users/activateUser", async (token: string) => {
  // try {
    const response = await api.post(`${baseURL}/users/activate/`, { token })
    console.log(response);
    
    return response.data
  // } catch (error) {
  //   throw new Error('Failed to activate user')
  // }
})

export const loginUser = createAsyncThunk("User/loginUser", async (user: object) => {
  try {
    const response = await api.post(`${baseURL}/auth/login`, user)
    return response.data
  } catch (error) {
    throw new Error('Failed to login the user')
  }
})

export const logoutUser = createAsyncThunk("User/logoutUser", async () => {
  try {
    const response = await api.post(`${baseURL}/auth/logout`)
    return response.data
  } catch (error) {
    throw new Error('Failed to logout the user')
  }
})

export const forgetPassword = createAsyncThunk('User/forgetPassword', async (email: string) => {
  try {
    const response = await api.post(`${baseURL}/users/forget-password`, { email: email })
    return response.data
  } catch (error) {
    throw new Error('Falied')
  }
})

export const resetPassword = createAsyncThunk('User/resetPassword', async (data: object) => {
  try {
    const response = await api.post(`${baseURL}/users/reset-password`, {
      password: data.password,
      token: data.token
    })
    return response.data
  } catch (error) {
    throw new Error('Falied')
  }
})

const data = localStorage.getItem("loginData") !== null ? JSON.parse(String(localStorage.getItem('loginData'))) : []

const initialState: initialStateUser = {
  users: [],
  error: null,
  isLoading: false,
  isLoggedIn: data.isLoggedIn,
  userData: data.userData
}

export const userSlice = createSlice({
  name: 'User',
  initialState: initialState,
  reducers: {
    // updateUser: (state, action) => {
    //   const { id, firstName, lastName } = action.payload
    //   const foundUser = state.users.find((user) => user._id === id)
    //   if (foundUser) {
    //     foundUser.firstName = firstName
    //     foundUser.lastName = lastName
    //     state.userData = foundUser
    //     localStorage.setItem(
    //       'loginData',
    //       JSON.stringify({
    //         isLoggedIn: state.isLoggedIn,
    //         userData: state.userData
    //       })
    //     )
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Error"
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.userName !== action.payload)
        state.users = action.payload
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userData = action.payload.payload
        localStorage.setItem(
          'loginData',
          JSON.stringify({
            isLoggedIn: state.isLoggedIn,
            userData: state.userData
          })
        )
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoggedIn = false
        state.userData = null
        localStorage.setItem(
          'loginData',
          JSON.stringify({
            isLoggedIn: state.isLoggedIn,
            userData: state.userData
          })
        )
      })
      .addCase(updateTheUser.fulfilled, (state, action) => {
        if (state.userData) {
          state.userData.firstName = action.payload?.firstName
          state.userData.lastName = action.payload?.lastName
          localStorage.setItem(
            'loginData',
            JSON.stringify({
              isLoggedIn: state.isLoggedIn,
              userData: state.userData
            })
          )
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


export default userSlice.reducer