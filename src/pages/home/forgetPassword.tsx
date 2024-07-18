import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../redux/store'
import { forgetPassword } from '../../redux/slices/userSlice'
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'


export const ForgetPassword = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [email, setEmail] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    dispatch(forgetPassword(email))
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
            ForgetPassword
            </Typography>
      <form onSubmit={handleSubmit} action="login-form">
        <Typography component="h1" variant="h5">
            Email:
            </Typography>
          {/* <label htmlFor="email">Email:</label> */}
          <TextField
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
            required
            placeholder="Enter your Email"
          />
          <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
              >
                Send Reset Email
              </Button>
      </form>
      </Paper>
      </Container>
      </Box>
  )
}