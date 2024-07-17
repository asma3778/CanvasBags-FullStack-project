import jwtDecode from 'jwt-decode'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { AppDispatch } from '../../redux/store'
import { resetPassword } from '../../redux/slices/userSlice'

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
    console.log('Reset Password successfully')
    navigate('/login')
  }

  return (
    <div className="activate-user">
      <div>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="text-box">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
              required
              placeholder="Enter your New Password"
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  )
}
