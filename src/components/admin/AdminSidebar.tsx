import { Link } from 'react-router-dom'

export const AdminSidebar = () => {
    return (
        <>
            <aside className='sidebar'>
                <header className='sidebar-header'>Admin Dashboard</header>
                <ul className='sidebar-container'>
                    <li>
                        <Link to="/admin/category">Category </Link>
                    </li>
                    <li>
                        <Link to="/admin/products">Products </Link>
                    </li>
                    <li>
                        <Link to="/admin/users">Users </Link>
                    </li>
                    {/* <li>
                        <Link to="/admin/orders">Orders </Link>
                    </li> */}
                </ul>
            </aside>
        </>
    )
};