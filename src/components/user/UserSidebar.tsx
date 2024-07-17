import { Link } from 'react-router-dom'

export const UserSidebar = () => {
    return (
        <aside className='sidebar'>
            <header className='sidebar-header'>Your Dashboard </header>
            <ul className='sidebar-container'>
                <li>
                    <Link to="/user/profile">Your Profile </Link>
                </li>
            </ul>
        </aside>
    )
};
