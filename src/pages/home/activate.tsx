import jwtDecode from 'jwt-decode'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { activateUser } from '../../redux/slices/userSlice'
import { AppDispatch } from '../../redux/store'
import { User } from '../../types/types'



const Activate = () => {

  const { token } = useParams()
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const decode: User = jwtDecode(String(token))

  const handleActivate = async () => {
    try {
      dispatch(activateUser(String(token)))

      navigate('/auth/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Hello {decode.firstName}! click the button for activating user account</h1>
      <button type="submit" onClick={handleActivate}>
        activate page
      </button>
    </div>
  )
}

export default Activate