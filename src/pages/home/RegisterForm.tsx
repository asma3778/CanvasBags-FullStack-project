import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';

import { AppDispatch } from '../../redux/store';
import { registerUser } from '../../redux/slices/userSlice';

export const RegisterForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
  })
  const [firstNameError, setFirstNameError] = useState('')
  // const [lastNameError, setLastNameError] = useState('')
  // const [userNameError, setUserNameError] = useState('')
  // const [passwordError, setPasswordError] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => {
      return { ...prevUser, [event.target.name]: event.target.value }
    })
  }
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    await registerUser(user)

    // const newUser = { id: new Date().getTime(), ...user }

    if (user.firstName.length < 2) {
      setFirstNameError('first name must be at least 2 characters')
      return
    }

    // if (user.lastName.length < 2) {
    //   setLastNameError('last name must be at least 2 characters')
    //   return
    // }
    // if (user.userName.length < 4) {
    //   setUserNameError('must be at least 4 characters')
    //   return
    // }
    // if (!/[A-Z]/.test(user.userName)) {
    //   setUserNameError('User Name must contain at least one uppercase letter')
    //   return
    // }
    // if (user.password.length < 6) {
    //   setPasswordError('Password must be at least 6 characters')
    //   return
    // }
    // if (!/[A-Z]/.test(user.password)) {
    //   setPasswordError('Password must contain at least one uppercase letter')
    //   return
    // }
    // if (!/[@#$%^&+=]/.test(user.password)) {
    //   setPasswordError('Password must contain at least one special character')
    //   return
    // }

    // dispatch(fetchUsers()).then(() => dispatch(addUser(newUser)))
    // navigate('/login')
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
              Register
            </Typography>
            <form style={{ width: '100%', marginTop: '20px' }} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="Firstname"
                name="firstName"
                value={user.firstName}
                autoComplete="firstname"
                onChange={handleChange}
              />
              {/* <p>{firstNameError}</p> */}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Lastname"
                name="lastName"
                value={user.lastName}
                autoComplete="lastname"
                onChange={handleChange}
              />
              {/* <p>{lastNameError}</p> */}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="userName"
                value={user.userName}
                autoComplete="username"
                onChange={handleChange}
              />
              {/* <p>{userNameError}</p> */}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="email"
                value={user.email}
                label="Email Address"
                type="email"
                id="email"
                autoComplete="email"
                onChange={handleChange}
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
                onChange={handleChange}
              />
              {/* <p>{passwordError}</p> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
              >
                Register
              </Button>
            </form>
            <p style= {{ marginTop: '20px', marginBottom: '20px' }}>
              Already have an account?{' '}
              <Link to="/auth/login" style={{ textDecoration: 'none' }}>
                Login
              </Link>
            </p>
          </Paper>
        </Container>
      </Box>
  );
};