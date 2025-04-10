import { Navigate, Outlet } from 'react-router'

const AdminLayout = () => {
    const token = localStorage.getItem('accessToken')

    if (!token) {
        return <Navigate to="/" />
    }

    return <Outlet />
}

export default AdminLayout
