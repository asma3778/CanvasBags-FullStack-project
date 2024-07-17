import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../redux/store';
import { logoutUser } from '../redux/slices/userSlice';

export const NavBar = () => {

    const { isLoggedIn, userData } = useSelector((state: RootState) => state.userReducer)
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        dispatch(logoutUser())
        navigate('/')
    }
    return (
        <>
            <nav className='hero-nav'>
                <div className="logo">Canvas<span>Bags</span></div>
                <ul>
                    {isLoggedIn && (
                        <>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            {/* <li>
                    <Link to="/contact">Contact</Link>
                </li> */}

                            <li>
                                <Link to={`${userData && userData.isAdmin ? 'admin' : 'user'}`}>
                                    {userData && userData.isAdmin ? 'admin' : 'user'}
                                    Dashboard</Link>
                            </li>

                            <li className='right-nav'>
                                <Link to="/auth/login" onClick={handleLogOut}>Logout </Link>
                            </li>
                        </>
                    )}
                    {/* {isLoggedIn && userData?.isAdmin == 'user' &&  ( */}
                    <>
                        <li className='right-nav'>
                            <Link to="/cart">Cart</Link>
                        </li>
                    </>


                    {!isLoggedIn && (
                        <>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            {/* <li>
                    <Link to="/contact">Contact</Link>
                </li> */}
                            <li className='right-nav'>
                                <Link to="/process-register">Register</Link>
                            </li>
                            <li className='right-nav'>
                                <Link to="/auth/login">login</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </>
    )
};
