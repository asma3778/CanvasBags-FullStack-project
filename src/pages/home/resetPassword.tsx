import jwtDecode from 'jwt-decode'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { AppDispatch } from '../../redux/store'
import { resetPassword } from '../../redux/slices/userSlice'
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'

interface DecodedType {
  name: string
}

export const ResetPassword = () => {
  const { token } = useParams()
  const decoded: DecodedType = jwtDecode(String(token))
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const [password, setPassword] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    dispatch(resetPassword({ password, token }))
    navigate('/login')
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
        Reset Password
        </Typography>
        <form style={{ width: '100%', marginTop: '20px' }} onSubmit={handleSubmit}>
        <Typography component="h1" variant="h5">
        Password:
        </Typography>
          <TextField
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleChange}
            required
            placeholder="Enter your New Password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
          >
            Reset Password
          </Button>
          </form>
      </Paper>
    </Container>
  </Box>
  )
}
