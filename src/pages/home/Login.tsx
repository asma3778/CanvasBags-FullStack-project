import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'

import { AppDispatch, RootState } from '../../redux/store'
import {
  loginUser,
} from '../../redux/slices/userSlice'
import api from '../../api'

export const Login = ({ pathName }: { pathName: string }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { users, userData } = useSelector((state: RootState) => state.userReducer)
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }
    })
  }

  useEffect(() => {
    if (userData) {
      navigate(
        pathName ? pathName : `/dashboard/${userData && userData.isAdmin ? 'admin' : 'user'}`
      )
    }
  }, [userData, navigate, pathName])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      dispatch(loginUser(user))
      navigate(`/dashboard/${userData?.isAdmin ? 'admin' : 'user'}`)
    } catch (error) {
      console.log(error)
    }
    setUser({
      email: '',
      password: ''
    })
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            login
          </Typography>
          <form style={{ width: '100%', marginTop: '20px' }} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              value={user.email}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={user.password}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
            >
              Login
            </Button>
            <Button type="submit">
              <Link to="/dashboard/forget-password">Forget Password ?</Link>
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  )
}